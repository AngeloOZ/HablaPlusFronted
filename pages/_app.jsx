import "../styles/globals.css";

import axios from "axios";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../theme";

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`;
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
