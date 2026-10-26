import { useContext } from "react";
import { LoginContext } from "./LoginContext";

const LoginStatus = () => {
  const { isLogin, login, logout } = useContext(LoginContext);

  return (
    <div>
      <h2>로그인 상태 관리</h2>

      <h3>
        현재 상태: {isLogin ? "로그인 중" : "로그아웃"}
      </h3>

      {isLogin ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <button onClick={login}>로그인</button>
      )}
    </div>
  );
};

export default LoginStatus;