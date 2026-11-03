
export const ROLES = ['user', 'admin'] as const;

export type Role = typeof ROLES[number];

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  role: Role;
}

export type NewUser = Omit<User, 'id'>;
