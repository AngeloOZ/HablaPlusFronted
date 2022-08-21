import '../styles/globals.css'

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
    )
}

export default MyApp
