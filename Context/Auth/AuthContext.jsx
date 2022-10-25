import { createContext } from "react";

const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  username: undefined,
  rol: undefined,
  id: undefined,
  loginUser: () => {},
  logoutUser: () => {},
  registerUser: () => {},
};

export const AuthContext = createContext(({} = AUTH_INITIAL_STATE));
