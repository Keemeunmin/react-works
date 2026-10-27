function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}

function printMessage(message: string): void {
  console.log(message);
}

console.log(add(10, 20));
console.log(greet("김철수"));

printMessage("TypeScript 공부 중입니다.");