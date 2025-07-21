import { useState, type FC, type PropsWithChildren } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const isAuthenticated = !!token;

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUsername(null);
    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{ username, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
