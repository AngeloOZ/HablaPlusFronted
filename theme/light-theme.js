import { createTheme } from '@mui/material/styles';


export const lightTheme = createTheme({
   palette: {
      mode: 'dark',
      // primary: {
      //    main: '#1E1E1E',
      //    light: '#454545',
      //    dark: '#000000'
      // },
      secondary: {
         main: '#3A64D8'
      },
      info: {
         main: '#fff'
      }
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
               fontWeight: 600
            },
            h2: {
               fontSize: 20,
               fontWeight: 400
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
               boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
               borderRadius: '10px',
            }
         }
      }

   }
});