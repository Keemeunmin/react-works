import { useState } from "react";
import DrinkList from "./DrinkList";

const Drinks2 = () => {
  const [drinks, setDrinks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addDrink = () => {
    const newDrink = inputValue.trim();

    if (newDrink == "") {
      alert("음료 이름을 입력하세요");
      return;
    }

    setDrinks([...drinks, newDrink]);
    setInputValue("");
  };

  return (
    <div>
      <h2>음료 추가</h2>

      <input
        type="text"
        placeholder="음료 이름을 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={addDrink}>음료 추가</button>

      <DrinkList drinks={drinks} />

   
    </div>
  );
};

export default Drinks2;