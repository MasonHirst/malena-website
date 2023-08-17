import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import muiStyles from '../../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
const { Avatar, Box, Typography, Button, TextField, Card, Link, blue } = muiStyles

const LoginPage = () => {
  const { handleContextLogin } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loginLoading, setLoginLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passError, setPassError] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (!email) return setEmailError('Email is required')
    if (!password) return setPassError('Password is required')

    setLoginLoading(true)
    axios
      .post('/api/staff/login', { email, password })
      .then(({data}) => {
        if (data.accessToken) {
          handleContextLogin(data)
        } else {
          setEmailError(data)
        }
      })
      .catch(console.error)
      .finally(() => setLoginLoading(false))
  }

  useEffect(() => {
    setEmailError('')
    setPassError('')
  }, [email, password])

  return (
    <Card elevation={3} className='login-page-card'>
      <Typography
        variant='h6'
        sx={{
          marginBottom: '20px',
        }}
      >
        Staff login
      </Typography>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
        }}
        onSubmit={handleLogin}
      >
        <TextField
          disabled={loginLoading}
          fullWidth
          label='Email'
          size='small'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          fullWidth
          disabled={loginLoading}
          label='Password'
          size='small'
          variant='outlined'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passError}
          helperText={passError}
        />
        <Button
          type='submit'
          disabled={loginLoading}
          variant='contained'
          size='small'
          sx={{
            textTransform: 'none',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            width: '100%',
            marginTop: '10px',
          }}
        >
          Login
        </Button>

        <Link onClick={() => navigate('../new-admin')} sx={{ color: blue[500], width: '100%', cursor: 'pointer' }} underline='hover'>
          New admin account
        </Link>
      </form>
    </Card>
  )
}

export default LoginPage
