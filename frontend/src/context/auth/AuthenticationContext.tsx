import { createContext, useContext } from "react";

interface AuthenticationContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthenticationContext);
