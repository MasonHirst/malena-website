import React, { useContext, useState } from 'react'
import muiStyles from '../styles/muiStyles'
import { CircularProgress, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const { Typography, Box, Link } = muiStyles

const Footer = () => {
  const { authState, user, logout } = useContext(AuthContext)
  console.log(user)
  const navigate = useNavigate()
  const [logoutLoading, setLogoutLoading] = useState(false)

  function handleLogout() {
    setLogoutLoading(true)
    setTimeout(() => {
      logout()
      setLogoutLoading(false)
    }, 800)
  }

  return (
    <Box className='footer-container'>
      <Stack>
        <Typography>Malena Hirst</Typography>
        <Typography>
          Website built by{' '}
          <a
            href='https://masonhirst.github.io'
            target='_blank'
            className='footer-link'
          >
            Mason Hirst
          </a>{' '}
          using React
        </Typography>
      </Stack>
      <Stack>
        <a onClick={() => navigate('/classes')} className='footer-link'>
          Contact me
        </a>
        <a className='footer-link'>Classes</a>
      </Stack>

      <Stack>
        {authState === 'AUTHENTICATED' && user.name && (
          <Typography>Welcome, {user.name}</Typography>
        )}
        <a onClick={() => navigate('/staff')} className='footer-link'>
          {authState === 'AUTHENTICATED' ? 'Admin portal' : 'Admin login'}
        </a>
        {authState === 'AUTHENTICATED' &&
          (logoutLoading ? (
            <CircularProgress size={40} sx={{ marginLeft: '20px' }} />
          ) : (
            <a onClick={handleLogout} className='footer-link'>
              Admin logout
            </a>
          ))}
      </Stack>
    </Box>
  )
}

export default Footer
