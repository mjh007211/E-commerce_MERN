import { createContext, useContext } from "react";

interface AuthenticationContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  myOrders: any[];
  login: (username: string, token: string) => void;
  logout: () => void;
  fetchMyOrders: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  fetchMyOrders: () => {},
  myOrders: [],
});

export const useAuth = () => useContext(AuthenticationContext);
