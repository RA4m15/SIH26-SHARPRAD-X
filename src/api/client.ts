const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(public status: number, public data: any) {
    super(data.error || 'An API error occurred');
  }
}

const NUMERIC_KEYS = new Set([
  'progressPercent',
  'placedRate',
  'wageDeltaPercent',
  'retention6M',
  'epfoMatchRate',
  'biometricAttendanceRate',
  'assessmentCleared',
]);

export function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  }
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date) && !(obj instanceof RegExp)) {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      let camelKey = key.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
      if (camelKey === 'retention6m') camelKey = 'retention6M';
      
      let val = snakeToCamel(obj[key]);
      
      if (NUMERIC_KEYS.has(camelKey) && typeof val === 'string' && !isNaN(Number(val))) {
        val = Number(val);
      }
      
      acc[camelKey] = val;
      if (camelKey !== key) {
        acc[key] = val;
      }
      return acc;
    }, {});
  }
  return obj;
}

export const api = {
  getToken() {
    return localStorage.getItem('hirebound_token');
  },
  
  setToken(token: string) {
    localStorage.setItem('hirebound_token', token);
  },
  
  clearToken() {
    localStorage.removeItem('hirebound_token');
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    
    const token = this.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    let data;
    try {
      data = await response.json();
      if (data) {
        data = snakeToCamel(data);
      }
    } catch (e) {
      data = null;
    }

    if (!response.ok) {
      if (response.status === 401) {
        // Optional: trigger global logout event if token is invalid
        window.dispatchEvent(new Event('auth:unauthorized'));
      }
      throw new ApiError(response.status, data);
    }

    return data as T;
  },

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  },

  post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });
  },

  patch<T>(endpoint: string, body: any = {}) {
    return this.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) });
  },

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
};
