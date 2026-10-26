import { createContext, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
  };

  return (
    <LoginContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};