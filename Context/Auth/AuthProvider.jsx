import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext, authReducer } from "./";

const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  username: undefined,
  rol: undefined,
  id: undefined,
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
        const { data } = await axios.post("/auth/validate-token", {
          token,
        });
        const payloadData = data.data;
        dispatch({
          type: "AUTH_LOGIN",
          payload: {
            username: payloadData.USERNAME,
            rol: payloadData.TIPO,
            id: payloadData.IDUSUARIO,
          },
        });
      } catch (error) {
        console.error(error);
        Cookies.remove("SESSION_ID");
      }
    }
  };

  const loginUser = async (user, pwd) => {
    try {
      const bodyData = { USERNAME: user, PASSWORD: pwd };
      const { data } = await axios.post("/auth", bodyData);
      const { username, rol, token, id } = data.data;
      Cookies.set("SESSION_ID", token, { expires: 1 });
      dispatch({ type: "AUTH_LOGIN", payload: { username, rol, id } });
      return {
        hasError: false,
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
        response: { message: "El usuario y/o contraseña no son válidos" },
      };
    }
  };

  const registerUser = async (body) => {
    try {
      const { data } = await axios.post("/usuario/cliente", body);
      const { username, rol, token, id } = data.data;
      Cookies.set("SESSION_ID", token, { expires: 1 });

      dispatch({ type: "AUTH_LOGIN", payload: { username, rol, id } });

      return {
        hasError: false,
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
        response: { message: "No se pudo crear el usuario - intente de nuevo" },
      };
    }
  };

  const logoutUser = () => {
    Cookies.remove("SESSION_ID");
    Cookies.remove("cart");
    router.push("/");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
