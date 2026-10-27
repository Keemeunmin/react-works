interface Student {
  name: string;
  age: number;
  major: string;
}

const student1: Student = {
  name: "김철수",
  age: 25,
  major: "통계학",
};

console.log(student1.name);
console.log(student1.age);
console.log(student1.major);