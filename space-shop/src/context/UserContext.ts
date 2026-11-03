
import { createContext, useContext } from 'react';
import type { NewUser, User } from '../types/user';

interface UserContextValue {
  currentUser: User | null;
  signIn: (username: string, password: string) => boolean;
  signOut: () => void;
  signUp: (user: Omit<NewUser, 'role'>) => boolean;
}

export const UserContext =
  createContext<UserContextValue | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useUser는 UserProvider 안에서 사용해야 합니다.'
    );
  }

  return context;
};
