import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, ApiError } from '../api/client';

export type UserRole = 'ministry_officer' | 'provider';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  designation: string;
  portal_mode: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User> = {
  'rajesh.verma@msde.gov.in': {
    id: 'a0000000-0000-0000-0000-000000000001',
    email: 'rajesh.verma@msde.gov.in',
    name: 'Rajesh Verma, IAS',
    role: 'ministry_officer',
    designation: 'Joint Director, Skill Outcomes',
    portal_mode: 'ministry-engine',
  },
  'ms.patwardhan@yuvaskill.org': {
    id: 'a0000000-0000-0000-0000-000000000002',
    email: 'ms.patwardhan@yuvaskill.org',
    name: 'Dr. M. S. Patwardhan',
    role: 'provider',
    designation: 'Head of Ops · Yuva Council',
    portal_mode: 'provider-portal',
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = api.getToken();
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Try getting user from API
        try {
          const res = await api.get<{ success: boolean; data: User }>('/auth/me');
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('hirebound_user', JSON.stringify(res.data));
            return;
          }
        } catch {
          // If API is unreachable (different device/network), restore cached user
          const cached = localStorage.getItem('hirebound_user');
          if (cached) {
            try {
              setUser(JSON.parse(cached));
              return;
            } catch {
              // ignore json parse error
            }
          }
          if (token.startsWith('demo_')) {
            const demoUser = Object.values(DEMO_USERS).find(u => token.includes(u.id));
            if (demoUser) {
              setUser(demoUser);
              return;
            }
          }
        }
      } catch (err) {
        api.clearToken();
        localStorage.removeItem('hirebound_user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    const handleUnauthorized = () => {
      api.clearToken();
      localStorage.removeItem('hirebound_user');
      setUser(null);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    const normalizedEmail = email.trim().toLowerCase();

    // 1. First attempt live backend API login
    try {
      const res = await api.post<{ success: boolean; data: { accessToken: string; user?: User } }>('/auth/login', { email, password });
      api.setToken(res.data.accessToken);
      
      let currentUser: User | null = res.data.user || null;
      if (!currentUser) {
        const userRes = await api.get<{ success: boolean; data: User }>('/auth/me');
        currentUser = userRes.data;
      }
      setUser(currentUser);
      localStorage.setItem('hirebound_user', JSON.stringify(currentUser));
      return;
    } catch (err) {
      // 2. If the backend responded with explicit 401 Unauthorized, credentials were wrong
      if (err instanceof ApiError && err.status === 401) {
        setError(err.message || 'Invalid email or password');
        throw err;
      }

      // 3. If server is unreachable (connecting from another device, cellular data, or server offline)
      // verify demo credentials locally to ensure seamless access across devices
      if (DEMO_USERS[normalizedEmail] && password === 'HireBound@2024') {
        const demoUser = DEMO_USERS[normalizedEmail];
        api.setToken('demo_token_' + demoUser.id);
        setUser(demoUser);
        localStorage.setItem('hirebound_user', JSON.stringify(demoUser));
        return;
      }

      // Otherwise report authentication failure
      if (DEMO_USERS[normalizedEmail]) {
        setError('Invalid password for demo account.');
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Login failed. Please verify your credentials or server connection.');
      }
      throw err;
    }
  };

  const logout = () => {
    api.clearToken();
    localStorage.removeItem('hirebound_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
