import React from 'react'
import muiStyles from '../styles/muiStyles'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

const { Typography, Button, Box } = muiStyles

const HomeHeroSection = () => {
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const is900Screen = useMediaQuery('(max-width: 900px)')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: is900Screen ? 'column' : 'row-reverse',
        gap: { xs: '15px', sm: '30px' },
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: '120px',
        padding: '0 10px',
      }}
    >
      <img
        style={{ maxWidth: isSmallScreen ? 'min(100%, 300px)' : '590px' }}
        alt="kids painting"
        src="https://plus.unsplash.com/premium_photo-1686920244656-49a53311437b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXJ0JTIwY2FtcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
      />
      <Box className="flex-col gap-10" sx={{ alignItems: 'center' }}>
        <Typography
          variant="h3"
          color="primary"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '24px', sm: '35px' },
            textAlign: 'center',
          }}
        >
          Classes 2023
        </Typography>
        <Typography
          variant="subtitle"
          sx={{ fontSize: '20px', textAlign: 'center' }}
        >
          Sign up now for a variety of fun summer classes for kids of all ages!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/classes')}
          sx={{
            textTransform: 'none',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            width: isSmallScreen ? '200px' : '250px',
            marginTop: '10px',
          }}
        >
          View classes
        </Button>
      </Box>
    </Box>
  )
}

export default HomeHeroSection
