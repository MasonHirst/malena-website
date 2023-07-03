import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import muiStyles from '../styles/muiStyles'
import { useMediaQuery } from '@mui/material'

const { Typography, Button, Box, Drawer, MenuItem, MenuIcon, IconButton } =
  muiStyles

function Header() {
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const navItems = [
    ,
    { title: 'Home', path: '/' },
    // { title: 'About', path: '/about' },
    { title: 'Summer Camps', path: '/camps' },
    // { title: 'Contact', path: '/contact' },
  ]

  return (
    <Box
      sx={{
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
        <Typography
          color="primary"
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: { xs: '24px', sm: '32px' },
          }}
        >
          Malena Hirst
        </Typography>
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
        position="left"
        open={showDrawer}
        sx={{ width: '500px' }}
        onClose={() => setShowDrawer(false)}
      >
        <Typography
          color="primary"
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: { xs: '24px', sm: '32px' },
            margin: '20px 0',
          }}
        >
          Malena Hirst
        </Typography>
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
