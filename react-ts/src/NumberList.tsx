import { useState } from "react";

const NumberList = () => {
  const [numbers, setNumbers] = useState<number[]>([1, 2, 3]);

  const addNumber = () => {
    const lastNumber = numbers[numbers.length - 1];
    setNumbers([...numbers, lastNumber + 1]);
  };

  return (
    <div>
      <h3>숫자 배열 상태 관리</h3>

      <p>숫자 목록: {numbers.join(", ")}</p>

      <button onClick={addNumber}>숫자 추가</button>
    </div>
  );
};

export default NumberList;