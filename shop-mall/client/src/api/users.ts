
import api from './api';
import type {
  User,
  NewUser,
  UpdateUser,
} from '../context/UserContext';

// 로그인 API 응답 형식
interface LoginResponse {
  message: string;
  user: User;
}

// 로그인
export const loginUser = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await api.post<LoginResponse>(
    '/users/login',
    {
      username,
      password,
    }
  );

  // 응답 전체가 아니라 user 객체만 반환
  return response.data.user;
};

// 회원가입
export const registerUser = async (
  newUser: NewUser
): Promise<void> => {
  await api.post('/users', newUser);
};

// 회원정보 변경
export const updateUser = async (
  id: number,
  data: UpdateUser
): Promise<User> => {
  const response = await api.put<User>(
    `/users/${id}`,
    data
  );

  return response.data;
};
