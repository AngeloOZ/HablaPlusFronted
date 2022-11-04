import { createContext } from "react";

const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  username: undefined,
  names: undefined,
  surname: undefined,
  age: undefined,
  avatar: undefined,
  id_type: undefined,
  id_user: undefined,
  loginUser: () => {},
  logoutUser: () => {},
  registerUser: () => {},
  verifyToken: () => {},
};

export const AuthContext = createContext(({} = AUTH_INITIAL_STATE));
