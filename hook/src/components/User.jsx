import { useEffect, useState } from "react";

const User = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);

  useEffect(() => {
    console.log("렌더링...");
    console.log(`이름: ${name}, 나이: ${age}`);
  }, [age]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeAge = (e) => {
    setAge(Number(e.target.value));
  };

  return (
    <div>
      <h2>사용자 정보</h2>

      <input
        type="text"
        value={name}
        onChange={onChangeName}
      />

      <br />

      <input
        type="number"
        value={age}
        onChange={onChangeAge}
      />

      <p>이름: {name}</p>
      <p>나이: {age}</p>
    </div>
  );
};

export default User;