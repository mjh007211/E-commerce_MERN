import { useState, type FC, type PropsWithChildren } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };

  return (
    <AuthenticationContext.Provider value={{ username, token, login }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
