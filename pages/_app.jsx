import "../styles/globals.css";

import axios from "axios";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../theme";
import { ModalProvider } from "../Context";

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`;
  return (
    <ModalProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ModalProvider>
  );
}

export default MyApp;
