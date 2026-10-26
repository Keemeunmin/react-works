import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

const SignIn = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [loginResult, setLoginResult] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username.trim() || !password.trim()) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    try {
      const response = await api.post("/login", {
        username,
        password
      });

      const user = response.data;

      setLoginResult("success");

      onLogin(user.username, user.role);

      alert("로그인되었습니다.");
      navigate("/");

    } catch (error) {
      console.error("로그인 오류:", error);
      setLoginResult("fail");
    }
  };

  return (
    <div className="sign-in">
      <h2>로그인</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="아이디 입력"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">로그인</button>
      </form>

      <p>
        아직 계정이 없으신가요?{" "}
        <Link to="/signup">회원가입</Link>
      </p>

      {loginResult === "fail" && (
        <p style={{ color: "red" }}>
          아이디 또는 비밀번호가 일치하지 않습니다.
        </p>
      )}
    </div>
  );
};

export default SignIn;