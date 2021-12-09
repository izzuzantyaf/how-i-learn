import '../styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// buat tema sendiri untuk mengubah beberapa tema default
const myTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '0 1.5rem 0 1.5rem',
          maxWidth: '768px',
        },
      },
    }
  },
  typography: {
    fontFamily: '"Nunito Sans", sans-serif, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  palette: {
    primary: {
      main: '#FFC947',
    },
    secondary: {
      main: '#185ADB',
    },
    black: {
      main: '#000000',
    }
  },
})

function MyApp({ Component, pageProps }) {
  return <>
    {/* bungkus komponen aplikasi dengan kustomisasi tema sendiri */}
    <ThemeProvider theme={myTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
}

export default MyApp
