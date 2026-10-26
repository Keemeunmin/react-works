import { useRef } from "react";

// useRef를 사용하여 input 요소에 접근
const InputFocus = () => {
  const inputRef = useRef(null);

  console.log(inputRef);

  // 가입 버튼 클릭 시 실행
  const doClick = () => {
    // 입력값이 없으면 경고
    if (!inputRef.current.value) {
      alert("이름을 입력하세요");
      inputRef.current.focus();
      return;
    }

    alert(`환영합니다. ${inputRef.current.value}님`);

    // 입력창에 포커스
    inputRef.current.focus();

    // 입력창 초기화
    inputRef.current.value = "";
  };

  return (
    <div>
      <h2>DOM 요소에 접근</h2>

      <input
        type="text"
        ref={inputRef}
        placeholder="이름을 입력하세요"
      />

      <button onClick={doClick}>가입</button>
    </div>
  );
};

export default InputFocus;
