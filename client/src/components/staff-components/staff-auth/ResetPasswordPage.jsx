import React, { useEffect, useState } from 'react'
import axios from 'axios'
import muiStyles from '../../../styles/muiStyles'
import { useLocation, useNavigate } from 'react-router-dom'
import { validate } from 'email-validator'
import { AuthContext } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
const {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  Link,
  blue,
  IconButton,
  InputAdornment,
  VisibilityOffIcon,
  VisibilityIcon,
} = muiStyles

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location
  const [tempCode, setTempCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const [newPass1, setNewPass1] = useState('')
  const [newPass2, setNewPass2] = useState('')
  const [passError, setPassError] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    if (!state?.email) navigate('../forgot-password')
  }, [tempCode])

  useEffect(() => {
    setCodeError('')
    setPassError('')
  }, [tempCode, newPass1, newPass2])

  useEffect(() => {
    if (newPass1.length === 0 && newPass2.length === 0) return
    if (newPass1 !== newPass2) {
      setPassError('Passwords do not match')
    } else if (newPass1.length < 8) {
      setPassError('Password must be at least 8 characters')
    } else {
      setPassError('')
    }
  }, [newPass2])

  function canSubmitForm() {
    setCodeError('')
    setPassError('')
    if (!tempCode) {
      setCodeError('Code is required')
      return false
    } else if (!newPass1) {
      setPassError('Password is required')
      return false
    } else if (newPass1 !== newPass2) {
      setPassError('Passwords do not match')
      return false
    } else if (newPass1.length < 8) {
      setPassError('Password must be at least 8 characters')
      return false
    } else {
      return true
    }
  }

  function handleChangePassword() {
    if (!canSubmitForm()) return
    setResetLoading(true)
    axios
      .put('/api/staff/reset-password', {
        tempCode,
        newPassword: newPass1,
        email: state.email,
      })
      .then(({ data }) => {
        switch (data) {
          case 'password updated':
            navigate('../login')
            toast.success('Password updated!')
            break
          case 'password cannot match':
            setPassError('You cannot use your old password.')
            break
          case 'invalid code':
            setCodeError('Code is invalid or expired.')
            break
          case 'password too short':
            setPassError('Password must be at least 8 characters.')
            break
          default:
            setCodeError(
              'Something went wrong. Please request a new code and try again.'
            )
            break
        }
      })
      .catch(console.error)
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
          autoFocus
          label='Temporary code'
          size='small'
          variant='outlined'
          value={tempCode}
          onChange={(e) => setTempCode(e.target.value)}
          error={!!codeError}
          helperText={codeError}
        />

        <TextField
          disabled={resetLoading}
          fullWidth
          type={showPass ? 'text' : 'password'}
          label='New password'
          size='small'
          variant='outlined'
          value={newPass1}
          onChange={(e) => setNewPass1(e.target.value)}
          error={!!passError}
          helperText={passError}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPass(!showPass)} edge='end'>
                  {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          disabled={resetLoading}
          fullWidth
          type={showPass ? 'text' : 'password'}
          label='Confirm new password'
          size='small'
          variant='outlined'
          value={newPass2}
          onChange={(e) => setNewPass2(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPass(!showPass)} edge='end'>
                  {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type='button'
          disabled={
            !!passError ||
            !!codeError ||
            !tempCode ||
            !newPass1 ||
            resetLoading ||
            !state?.email ||
            newPass1 !== newPass2 ||
            newPass1.length < 8
          }
          onClick={handleChangePassword}
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
          Change Password
        </Button>

        <Link
          disabled={resetLoading}
          onClick={() => navigate('../login')}
          sx={{ color: blue[500], width: '100%', cursor: 'pointer' }}
          underline='hover'
        >
          Back to Login
        </Link>
        <Link
          disabled={resetLoading}
          onClick={() => navigate('../forgot-password')}
          sx={{ color: blue[500], width: '100%', cursor: 'pointer' }}
          underline='hover'
        >
          Need new code
        </Link>
      </Box>
    </Card>
  )
}

export default ResetPasswordPage
