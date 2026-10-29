import { useState } from "react";
import type { ChangeEvent } from "react";

const InputValueState = () => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setText(e.target.value);
  };

  return (
    <div>
      <h3>이름 입력</h3>

      <input
        type="text"
        value={text}
        onChange={handleTextChange}
      />

      <p>입력된 글자: {text}</p>
    </div>
  );
};

export default InputValueState;