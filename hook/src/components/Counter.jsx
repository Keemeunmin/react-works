import { useState } from "react";

const Counter = () => {
  // count 상태 관리
  const [count, setCount] = useState(0);

  // 감소 핸들러
  const decrement = () => {
    setCount(count - 1);
  };

  // 초기화 핸들러
  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h2>Counter</h2>
      <h3>현재 Count: {count}</h3>

      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={decrement}>감소</button>
      <button onClick={reset}>초기화</button>
    </div>
  );
};

export default Counter;