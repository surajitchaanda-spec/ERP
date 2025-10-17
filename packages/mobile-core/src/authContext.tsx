import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type UserRole = 'teacher' | 'office';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  token: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{ initialUser?: UserProfile | null }>> = ({
  children,
  initialUser = null,
}) => {
  const [user, setUser] = useState<UserProfile | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const value = useMemo(() => ({ user, setUser, isLoading }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
