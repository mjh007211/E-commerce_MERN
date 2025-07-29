import { useState, type FC, type PropsWithChildren } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import { DATABASE_URL } from "../../constants/constants";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [myOrders, setMyOrders] = useState(null);

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

  const fetchMyOrders = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/user/my-orders`, {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();
      setMyOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        username,
        token,
        isAuthenticated,
        myOrders,
        login,
        logout,
        fetchMyOrders,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
