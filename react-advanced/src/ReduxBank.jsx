import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deposit, withdraw } from "./redux/bankSlice";

const ReduxBank = () => {
  const [amount, setAmount] = useState(0);

  const balance = useSelector((state) => state.bank.balance);

  const dispatch = useDispatch();

  const handleDeposit = () => {
    if (amount <= 0) {
      alert("0보다 큰 금액을 입력하세요.");
      return;
    }

    dispatch(deposit(amount));
  };

  const handleWithdraw = () => {
    if (amount <= 0) {
      alert("0보다 큰 금액을 입력하세요.");
      return;
    }

    if (balance < amount) {
      alert("잔액이 부족합니다.");
      return;
    }

    dispatch(withdraw(amount));
  };

  return (
    <div>
      <h2>Redux Toolkit 은행</h2>

      <h3>현재 잔액: {balance.toLocaleString()}원</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <button onClick={handleDeposit}>예금</button>

      <button onClick={handleWithdraw}>출금</button>
    </div>
  );
};

export default ReduxBank;