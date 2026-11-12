
import { createContext, useContext } from 'react';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

export interface NewUser {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface UpdateUser {
  name: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (newUser: NewUser) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateUser) => Promise<void>;
}

export const UserContext =
  createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UserProvider 안에서 사용해야 합니다.');
  }

  return context;
};
