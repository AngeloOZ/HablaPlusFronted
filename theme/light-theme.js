import { createTheme } from '@mui/material/styles';


export const lightTheme = createTheme({
   palette: {
      mode: 'dark',
      primary: {
         main: "#007bff",
         light: "#69a9ff",
         dark: "#0050cb"
      },
      info: {
         main: "#17a2b8",
         light: "#60d4ea",
         dark: "#007388"
      },
      success: {
         main: "#28a745",
         light: "#64da73",
         dark: "#007717"
      },
      error: {
         main: "#dc3545",
         light: "#ff6b70",
         dark: "#a3001e"
      },
      warning: {
         main: "#ffc107",
         light: "#fff350",
         dark: "#c79100"
      }
      // primary: {
      //    main: '#1E1E1E',
      //    light: '#454545',
      //    dark: '#000000'
      // },
      // secondary: {
      //    main: '#3A64D8'
      // },
      // info: {
      //    main: '#fff'
      // },
   },
   components: {
      MuiLink: {
         defaultProps: {
            underline: 'none',
         },
      },
      MuiAppBar: {
         defaultProps: {
            elevation: 0,
            position: 'fixed',
         },
      },

      MuiTypography: {
         styleOverrides: {
            h1: {
               fontSize: 30,
               fontWeight: 600,
            },
            h2: {
               fontSize: 20,
               fontWeight: 400,
            },
            subtitle1: {
               fontSize: 18,
               fontWeight: 600
            },
            subtitle2: {
               fontSize: 18,
               fontWeight: 400
            },
         }
      },


      MuiButton: {
         defaultProps: {
            variant: 'contained',
            size: 'small',
            disableElevation: true,
            color: 'info'
         },
         styleOverrides: {
            root: {
               textTransform: 'none',
               boxShadow: 'none',
               borderRadius: 10,
            }
         }
      },
      MuiCard: {
         defaultProps: {
            elevation: 0
         },
         styleOverrides: {
            root: {
               // backgroundColor: "crimson",
               boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
               borderRadius: '10px',
            }
         }
      }
   }
});