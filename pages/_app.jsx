import "../styles/globals.css";

import axios from "axios";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";

import { lightTheme } from "../theme";
import { AuthProvider, ModalProvider } from "../Context";

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`;

  if (Cookies.get("SESSION_ID")) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "SESSION_ID"
    )}`;
  }

  return (
    <AuthProvider>
      <ModalProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;
