// 제네릭 함수
function getValue<T>(value: T): T {
  return value;
}

console.log(getValue<number>(100));
console.log(getValue<string>("안녕하세요"));
console.log(getValue<boolean>(true));

// 배열의 첫 번째 요소를 반환하는 함수
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const numbers = [10, 20, 30];
const names = ["김은민", "홍길동", "이영희"];

console.log(getFirst<number>(numbers));
console.log(getFirst<string>(names));

const scores = [95, 88, 76];

console.log(getFirst<number>(scores));

export {};