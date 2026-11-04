
import { useState, type ReactNode } from 'react';
import { UserContext } from './UserContext';
import { initialUsers } from '../datas/users';
import type { NewUser, User } from '../types/user';

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  // 로그인한 회원의 id만 저장
  const [currentUserId, setCurrentUserId] =
    useState<number | null>(null);

  // 로그인
  const signIn = (username: string, password: string) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) return false;

    setCurrentUserId(user.id);
    return true;
  };

  // 로그아웃
  const signOut = () => {
    setCurrentUserId(null);
  };

  // 회원가입
  const signUp = (user: Omit<NewUser, 'role'>) => {
    if (users.some((u) => u.username === user.username)) {
      return false;
    }

    setUsers((prev) => {
      const nextId = Math.max(0, ...prev.map((u) => u.id)) + 1;

      return [
        ...prev,
        { ...user, id: nextId, role: 'user' }
      ];
    });

    return true;
  };

  // 로그인한 회원 정보 찾기
  const currentUser =
    users.find((u) => u.id === currentUserId) ?? null;

  return (
    <UserContext.Provider
      value={{ currentUser, signIn, signOut, signUp }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
