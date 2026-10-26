import { useState, useRef } from "react";

function Counter() {
  // state: 값이 변경되면 리렌더링
  const [count, setCount] = useState(0);

  // ref: 값을 기억하지만 변경만으로 리렌더링되지 않음
  const countRef = useRef(0);

  // 일반 변수: 리렌더링마다 초기화
  let countVar = 0;

  console.log("렌더링...");
  console.log(countRef);

  // State 증가
  const increaseCount = () => {
    setCount(count + 1);
  };

  // Ref 증가
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log("Ref:", countRef.current);
  };

  // 일반 변수 증가
  const increaseCountVar = () => {
    countVar = countVar + 1;
    console.log("Var:", countVar);
  };

  return (
    <div>
      <p>State: {count}</p>
      <p>Ref: {countRef.current}</p>
      <p>Var: {countVar}</p>

      <button onClick={increaseCount}>State 증가</button>
      <button onClick={increaseCountRef}>Ref 증가</button>
      <button onClick={increaseCountVar}>Var 증가</button>
    </div>
  );
}

export default Counter;