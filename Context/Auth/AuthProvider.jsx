import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext, authReducer } from "./";

const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  username: undefined,
  names: undefined,
  surname: undefined,
  avatar: undefined,
  id_type: undefined,
  id_user: undefined,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = Cookies.get("SESSION_ID") ? Cookies.get("SESSION_ID") : "";
    if (token != "") {
      try {
        const { data: user } = await axios.post("/auth/verify-token", {
          token
        });
        console.log(user);
        delete user.iat;
        dispatch({
          type: "AUTH_LOGIN",
          payload: user,
        });
      } catch (error) {
        console.error(error);
        Cookies.remove("SESSION_ID");
      }
    }
  };

  const loginUser = async (userCredentetials) => {
    try {
      const { data } = await axios.post("/auth/login", userCredentetials);
      const user = data;
      const token = user.token;
      delete user.token;
      Cookies.set("SESSION_ID", token, { expires: 1 });
      dispatch({ type: "AUTH_LOGIN", payload: user });
      return {
        hasError: false,
        id_type: user.id_type
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          response: error.response?.data,
        };
      }
      return {
        hasError: true,
        response: error,
      };
    }
  };

  const registerUser = async (body) => {
    try {
      console.log(body)
      const { data : user } = await axios.post("/auth/register", body);
      const token = user.token;
      delete user.token;

      Cookies.set("SESSION_ID", token, { expires: 1 });

      dispatch({ type: "AUTH_LOGIN", payload: user});

      return {
        hasError: false,
        id_type: user.id_type
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          response: error.response?.data,
        };
      }

      return {
        hasError: true,
        response: error
      };
    }
  };

  const logoutUser = () => {
    Cookies.remove("SESSION_ID");
    router.push("/auth/login");
    router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        //Methods
        loginUser,
        logoutUser,
        registerUser,
        verifyToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
