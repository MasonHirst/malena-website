import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './index.css'
import App from './App'
import { blue, green } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      // main: '#88B06A',
      // main: green[600],
      // main: '#228B22'
      // main: 'rgb(34, 139, 34)'
      main: 'rgb(34, 139, 34, .9)'
    },
    secondary: {
      // main: '#E33E7F',
      // main: blue[400],
      // main: 'rgb(222, 49, 99, .9)'
      main: 'rgb(227, 11, 92, .75)'
    },
  },
})

const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : document.location.origin
axios.defaults.baseURL = serverUrl

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('malenaSiteJwtToken')
  // Do something before request is sent
  return config
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
