import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h3>Counter</h3>

      <p>현재 카운트: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        증가
      </button>

      <button onClick={() => setCount(count - 1)}>
        감소
      </button>

      <button onClick={() => setCount(0)}>
        초기화
      </button>
    </div>
  );
};

export default Counter;