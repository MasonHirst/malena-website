import React, { useState, useContext } from 'react'
import axios from 'axios'
import muiStyles from '../../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
const { Avatar, Box, Typography, Button, TextField, Card, blue, Link } =
  muiStyles

const SignupPage = () => {
  const navigate = useNavigate()
  const { handleContextLogin } = useContext(AuthContext)
  const [loginLoading, setLoginLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [name, setName] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passError, setPassError] = useState('')
  const [pass2Error, setPass2Error] = useState('')
  const [nameError, setNameError] = useState('')
  const [adminPassError, setAdminPassError] = useState('')

  function handleCreateAccount(e) {
    e.preventDefault()
    if (!name) return setNameError('Name is required')
    else setNameError('')
    if (!email) return setEmailError('Email is required')
    else setEmailError('')
    if (!password) return setPassError('Password is required')
    else setPassError('')
    if (!adminPass) return setAdminPassError('Admin password is required')
    else setAdminPassError('')
    if (password !== password2) return setPass2Error('Passwords do not match')
    else setPass2Error('')

    setLoginLoading(true)
    axios
      .post('/api/staff/signup', { email, password, adminPass, name })
      .then(({ data }) => {
        if (data.user) {
          handleContextLogin(data)
        } else {
          switch (data) {
            case 'incorrect admin password':
              setAdminPassError('Invalid admin password')
              break
            case 'email already in use':
              setEmailError('Email already in use')
              break
            default:
              console.error('end of switch error options: ', data)
              break
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoginLoading(false))
  }

  return (
    <Card className='login-page-card'>
      <Typography
        variant='h6'
        sx={{
          marginBottom: '20px',
        }}
      >
        New staff account
      </Typography>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
        }}
        onSubmit={handleCreateAccount}
      >
        <TextField
          fullWidth
          disabled={loginLoading}
          label='Name'
          size='small'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
        />
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
        <TextField
          fullWidth
          disabled={loginLoading}
          label='Confirm Password'
          size='small'
          variant='outlined'
          type='password'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          error={!!pass2Error}
          helperText={pass2Error}
        />
        <TextField
          fullWidth
          type='password'
          disabled={loginLoading}
          label='Admin Password'
          size='small'
          variant='outlined'
          value={adminPass}
          onChange={(e) => setAdminPass(e.target.value)}
          error={!!adminPassError}
          helperText={adminPassError}
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

        <Link
          onClick={() => navigate('../login')}
          sx={{ color: blue[500], width: '100%', cursor: 'pointer' }}
          underline='hover'
        >
          Login instead
        </Link>
      </form>
    </Card>
  )
}

export default SignupPage
