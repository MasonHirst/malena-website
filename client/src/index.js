import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      main: '#88B06A'
    },
    secondary: {
      main: '#E33E7F',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
