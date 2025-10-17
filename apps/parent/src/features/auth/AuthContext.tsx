import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { client } from '../../shared/api/client';
import { clearAuthToken, getAuthToken, saveAuthToken } from '../../shared/storage/authStorage';
import { queryClient } from '../../shared/api/queryClient';
import { useAnalytics } from '../../shared/analytics/useAnalytics';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const analytics = useAnalytics();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await getAuthToken();
        if (token) {
          const { data } = await client.get<UserProfile>('/auth/me');
          setUser(data);
        }
      } catch (error) {
        console.warn('Failed to bootstrap auth', error);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await client.post<{ token: string; user: UserProfile }>('/auth/login', {
        email,
        password
      });
      await saveAuthToken(data.token);
      setUser(data.user);
      analytics.track('login_success');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await clearAuthToken();
    setUser(null);
    await queryClient.clear();
    analytics.track('logout');
  };

  const value = useMemo(() => ({ user, isLoading, login, logout }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
