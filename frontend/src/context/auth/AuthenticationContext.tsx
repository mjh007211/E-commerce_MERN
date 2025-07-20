import { createContext, useContext } from "react";

interface AuthenticationContextType {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  isAuthenticated: boolean;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
  username: null,
  token: null,
  login: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthenticationContext);
