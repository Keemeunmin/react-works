import React, { useReducer } from "react";

// reducer 함수는 현재 상태와 action을 받아
// 새로운 상태를 반환하는 함수
const reducer = (state, action) => {
  console.log(state, action);

  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "DECREMENT":
      return { count: state.count - 1 };

    case "RESET":
      return { count: 0 };

    default:
      return state;
  }
};

const CountReducer = () => {
  // useReducer로 상태와 dispatch 함수 생성
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h2>{state.count}</h2>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        증가
      </button>

      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        감소
      </button>

      <button onClick={() => dispatch({ type: "RESET" })}>
        초기화
      </button>
    </div>
  );
};

export default CountReducer;