type User = {
  id: number;
  name: string;
  email: string;
};

const user1: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
};

// user2 추가
const user2: User = {
  id: 2,
  name: "김은민",
  email: "eunmin@example.com",
};

console.log(user1);
console.log(user2);

// 상태 타입
type Status = "pending" | "success" | "error";

let currentStatus: Status = "pending";

console.log(currentStatus);

currentStatus = "success";

console.log(currentStatus);

export {};