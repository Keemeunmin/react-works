import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
  });

  const navigate = useNavigate();

  // 입력값 변경
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 회원가입
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, confirmPassword, email } = formData;

    // 빈칸 검사
    if (
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !email.trim()
    ) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await api.post("/users", {
        username,
        password,
        email
      });

      alert("회원가입이 완료되었습니다.");
      navigate("/signin");

    } catch (error) {
      console.error("회원가입 오류:", error);

      if (error.response?.status === 409) {
        alert("이미 존재하는 아이디입니다.");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  };

  // 입력 초기화
  const handleCancel = () => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      email: ""
    });
  };

  return (
    <div className="sign-up">
      <h2>회원가입</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button type="submit">가입</button>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;