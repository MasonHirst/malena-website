import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

const tokenKey = 'malenaSiteJwtToken'
const LOADING = 'LOADING'
const AUTHENTICATED = 'AUTHENTICATED'
const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'

export function Authentication({ children }) {
  const [user, setUser] = useState({})
  const [accessToken, setAccessToken] = useState(localStorage.getItem(tokenKey))
  const [authState, setAuthState] = useState(LOADING)

  function logout() {
    localStorage.removeItem(tokenKey)
    setAccessToken(null)
    setAuthState(NOT_AUTHENTICATED)
    toast.success(user.name + ' logged out')
    setUser(null)
  }

  function handleContextLogin(data) {
    if (data.user) {
      setUser(data.user)
      localStorage.setItem('malenaSiteEmailLogin', data.user.email)
    }
    if (data.accessToken) {
      localStorage.setItem(tokenKey, data.accessToken)
      setAccessToken(data.accessToken)
      setAuthState(AUTHENTICATED)

      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = data.accessToken
        // Do something before request is sent
        return config
      })
    }
  }

  function getUser(jwt) {
    if (jwt) {
      setAuthState(LOADING)
      axios
        .get('/api/staff/me', { token: jwt })
        .then(({ data }) => {
          if (data.user) {
            setUser(data.user)
          }
          if (data.accessToken) {
            setAccessToken(data.accessToken)
            setAuthState(AUTHENTICATED)
          } else {
            setAuthState(NOT_AUTHENTICATED)
          }
          if (data.error) {
            localStorage.removeItem(tokenKey)
          }
        })
        .catch((err) => {
          console.error(err)
          setAuthState(NOT_AUTHENTICATED)
        })
    } else {
      setAuthState(NOT_AUTHENTICATED)
    }
  }

  useEffect(() => {
    if (accessToken) {
      getUser(accessToken)
    } else if (!accessToken) {
      setAuthState(NOT_AUTHENTICATED)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        handleContextLogin,
        logout,
        user,
        accessToken,
        authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
