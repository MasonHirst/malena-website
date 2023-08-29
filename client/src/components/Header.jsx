import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import muiStyles from '../styles/muiStyles'
import { useMediaQuery } from '@mui/material'

const { Typography, Button, Box, Drawer, MenuItem, MenuIcon, IconButton } =
  muiStyles

function Header() {
  const isSmallScreen = useMediaQuery('(max-width: 700px)')
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const navItems = [
    { title: 'Home', path: '/' },
    // { title: 'About', path: '/about' },
    { title: 'Classes', path: '/classes' },
    { title: 'Contact', path: '/contact' },
    // { title: 'Admin', path: '/staff' },
  ]

  return (
    <Box
      sx={{
        position: 'sticky',
        zIndex: '100',
        backgroundColor: 'white',
        top: 0,
        height: '70px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { xs: '0 10px', sm: '0 20px' },
        boxShadow: '0px 0px 7px 0px rgba(0,0,0,0.75)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {isSmallScreen && (
          <IconButton
            onClick={() => setShowDrawer(true)}
            sx={{ marginRight: '10px' }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <a
          style={{
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <Typography
            color='primary'
            variant='h4'
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: { xs: '24px', sm: '32px' },
            }}
          >
            Malena Hirst
          </Typography>
        </a>
      </Box>

      {!isSmallScreen && (
        <Box
          sx={{
            marginRight: '40px',
            display: 'flex',
            gap: '25px',
            alignItems: 'center',
          }}
        >
          {navItems.map((item, index) => (
            <Button
              key={index}
              onClick={() => navigate(item.path)}
              sx={{
                textTransform: 'none',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>
      )}

      <Drawer
        position='left'
        open={showDrawer}
        sx={{ width: '500px' }}
        onClose={() => setShowDrawer(false)}
      >
        <a onClick={() => navigate('/')}>
          <Typography
            color='primary'
            variant='h4'
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: { xs: '24px', sm: '32px' },
              margin: '25px 30px',
            }}
          >
            Malena Hirst
          </Typography>
        </a>
        {navItems.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              fontSize: '19px',
            }}
            onClick={() => {
              setShowDrawer(false)
              navigate(item.path)
            }}
          >
            {item.title}
          </MenuItem>
        ))}
      </Drawer>
    </Box>
  )
}

export default Header
