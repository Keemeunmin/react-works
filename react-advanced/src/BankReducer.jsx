import { useState, useReducer } from "react";

// 초기 잔액
const initialState = {
  balance: 0
};

// 상태 변경 함수
const bankReducer = (state, action) => {
  console.log("reducer가 작동합니다.", state, action);

  switch (action.type) {
    // 예금
    case "DEPOSIT":
      return {
        ...state,
        balance: state.balance + action.payload
      };

    // 출금
    case "WITHDRAW":
      if (state.balance < action.payload) {
        alert("잔액이 부족합니다.");
        return state;
      }

      return {
        ...state,
        balance: state.balance - action.payload
      };

    default:
      return state;
  }
};

const BankReducer = () => {
  const [amount, setAmount] = useState(0);
  const [state, dispatch] = useReducer(bankReducer, initialState);

  return (
    <div>
      <h2>은행 입출금 시스템</h2>

      <h3>현재 잔액: {state.balance}원</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value) || 0)}
        step="1000"
      />

      <button
        onClick={() =>
          dispatch({ type: "DEPOSIT", payload: amount })
        }
      >
        예금
      </button>

      <button
        onClick={() =>
          dispatch({ type: "WITHDRAW", payload: amount })
        }
      >
        출금
      </button>
    </div>
  );
};

export default BankReducer;