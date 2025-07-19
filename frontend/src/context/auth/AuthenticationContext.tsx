import { createContext, useContext } from "react";

interface AuthenticationContextType {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
  username: null,
  token: null,
  login: () => {},
});

export const useAuth = () => useContext(AuthenticationContext);
