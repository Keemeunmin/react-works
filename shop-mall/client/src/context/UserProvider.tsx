
import { useState } from 'react';
import type { ReactNode } from 'react';

import {
  loginUser,
  registerUser,
  updateUser,
} from '../api/users';

import { UserContext } from './UserContext';

import type {
  User,
  NewUser,
  UpdateUser,
} from './UserContext';

interface Props {
  children: ReactNode;
}

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('loginUser');

      if (!savedUser) {
        return null;
      }

      const parsedUser = JSON.parse(savedUser);

      // 이전에 잘못 저장된 로그인 데이터 방지
      if (
        typeof parsedUser.id !== 'number' ||
        typeof parsedUser.username !== 'string'
      ) {
        localStorage.removeItem('loginUser');
        return null;
      }

      return parsedUser as User;
    } catch {
      localStorage.removeItem('loginUser');
      return null;
    }
  });

  // 로그인
  const login = async (
    username: string,
    password: string
  ): Promise<void> => {
    const loggedInUser = await loginUser(
      username,
      password
    );

    setUser(loggedInUser);

    localStorage.setItem(
      'loginUser',
      JSON.stringify(loggedInUser)
    );
  };

  // 회원가입
  const signup = async (
    newUser: NewUser
  ): Promise<void> => {
    await registerUser(newUser);
  };

  // 로그아웃
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('loginUser');
  };

  // 회원정보 변경
  const updateProfile = async (
    data: UpdateUser
  ): Promise<void> => {
    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    const updatedUser = await updateUser(
      user.id,
      data
    );

    setUser(updatedUser);

    localStorage.setItem(
      'loginUser',
      JSON.stringify(updatedUser)
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
