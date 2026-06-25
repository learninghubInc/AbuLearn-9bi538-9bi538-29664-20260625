// Powered by OnSpace.AI
import { createContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { authService } from '@/services/authService';
import { User } from '@/services/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  unlockPremium: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const current = await authService.getCurrent();
      setUser(current);
      setLoading(false);
    })();
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const u = await authService.signUp(name, email, password);
    setUser(u);
  }, []);

  const logIn = useCallback(async (email: string, password: string) => {
    const u = await authService.logIn(email, password);
    setUser(u);
  }, []);

  const logOut = useCallback(async () => {
    await authService.logOut();
    setUser(null);
  }, []);

  const unlockPremium = useCallback(async () => {
    if (!user) return;
    const updated = await authService.setPremium(user.id, true);
    if (updated) setUser(updated);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, logIn, logOut, unlockPremium }}>
      {children}
    </AuthContext.Provider>
  );
}
