import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import './index.css'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      main: '#88B06A',
    },
    secondary: {
      main: '#E33E7F',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
