import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  decrement,
  reset,
} from "./redux/counterSlice";

const ReduxCounter = () => {
  const count = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div>
      <h2>Redux Toolkit 카운터</h2>

      <h3>현재 숫자: {count}</h3>

      <button onClick={() => dispatch(increment())}>
        증가
      </button>

      <button onClick={() => dispatch(decrement())}>
        감소
      </button>

      <button onClick={() => dispatch(reset())}>
        초기화
      </button>
    </div>
  );
};

export default ReduxCounter;