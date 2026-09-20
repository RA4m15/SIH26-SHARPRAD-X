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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!api.getToken()) {
          setIsLoading(false);
          return;
        }
        const res = await api.get<{ success: boolean; data: User }>('/auth/me');
        setUser(res.data);
      } catch (err) {
        api.clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    const handleUnauthorized = () => {
      api.clearToken();
      setUser(null);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const res = await api.post<{ success: boolean; data: { accessToken: string } }>('/auth/login', { email, password });
      api.setToken(res.data.accessToken);
      
      const userRes = await api.get<{ success: boolean; data: User }>('/auth/me');
      setUser(userRes.data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Login failed. Please check your network and try again.');
      }
      throw err;
    }
  };

  const logout = () => {
    api.clearToken();
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
