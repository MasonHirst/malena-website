import React, { useContext, useEffect, useState } from 'react'
import muiStyles from '../styles/muiStyles'
import { CircularProgress, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const { Typography, Box, Link } = muiStyles

const Footer = () => {
  const { authState, user, logout } = useContext(AuthContext)
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
      <Stack spacing={2} className='footer-stack'>
        <a
          style={{
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <Typography>Malena Hirst</Typography>
        </a>
        <Typography>
          Website built by{' '}
          <a
            href='https://masonhirst.github.io'
            target='_blank'
            className='footer-link'
          >
            Mason Hirst
          </a>
        </Typography>
      </Stack>
      <Stack spacing={2} className='footer-stack'>
        <a className='footer-link' onClick={() => navigate('/contact')}>Contact me</a>
        <a className='footer-link' onClick={() => navigate('/classes')}>
          Classes
        </a>
      </Stack>

      <Stack spacing={2} className='footer-stack'>
        {authState === 'AUTHENTICATED' && user?.name && (
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
