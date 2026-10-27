// 제네릭 인터페이스
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// 사용자 타입
interface User {
  id: number;
  name: string;
  email: string;
}

// 사용자 데이터
const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "김은민",
    email: "eunmin@example.com",
  },
};

console.log(userResponse.success);
console.log(userResponse.data.name);
console.log(userResponse.data.email);