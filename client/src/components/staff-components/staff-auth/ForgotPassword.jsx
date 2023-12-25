import React, { useEffect, useState } from 'react'
import axios from 'axios'
import muiStyles from '../../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'
import { validate } from 'email-validator'
import { AuthContext } from '../../../context/AuthContext'
const { Box, Typography, Button, TextField, Card, Link, blue } = muiStyles

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [resetLoading, setResetLoading] = useState(false)
  const [email, setEmail] = useState(
    localStorage.getItem('malenaSiteEmailLogin') || ''
  )
  const [emailError, setEmailError] = useState('')
  const [resetRequestSuccess, setResetRequestSuccess] = useState(false)

  function handleSendResetEmail(e) {
    e.preventDefault()
    setEmailError('')
    if (!email) return setEmailError('Email is required')
    if (!validate(email)) return setEmailError('Invalid email')

    setResetLoading(true)
    axios
      .post('/api/staff/forgot-password', {
        email,
      })
      .then(() => {
        setResetRequestSuccess(true)
      })
      .catch((err) => {
        console.error(err)
        setResetRequestSuccess(false)
      })
      .finally(() => setResetLoading(false))
  }

  return (
    <Card elevation={3} className='login-page-card'>
      <Typography
        variant='h6'
        sx={{
          marginBottom: '20px',
        }}
      >
        Reset Password
      </Typography>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
        }}
      >
        <TextField
          disabled={resetLoading}
          fullWidth
          autoFocus={
            localStorage.getItem('malenaSiteEmailLogin') ? false : true
          }
          label='Email'
          size='small'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <Button
          type='button'
          disabled={resetLoading}
          onClick={handleSendResetEmail}
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
          Send code
        </Button>

        <Typography
          variant='body1'
          sx={{
            marginBottom: 0,
          }}
        >
          If an account with that email exists, it will receive a temporary code.
          <br />
          Check your spam folder if you don't see it.

        </Typography>


        <Button
          type='button'
          disabled={!resetRequestSuccess}
          onClick={() => navigate('../reset-password', { state: { email } })}
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
          Got it!
        </Button>

        <Link
          disabled={resetLoading}
          onClick={() => navigate('../login')}
          sx={{ color: blue[500], width: '100%', cursor: 'pointer' }}
          underline='hover'
        >
          Back to Login
        </Link>
      </Box>
    </Card>
  )
}

export default ForgotPassword
