import React from 'react'
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import muiStyles from '../../styles/muiStyles'
import { useNavigate } from 'react-router-dom'
const { Drawer, Box, List } = muiStyles

const StaffPortalNav = ({ drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate()
  const is800Screen = useMediaQuery('(max-width:800px)')

  const navItems = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      link: 'dashboard',
    },
    {
      name: 'Classes',
      icon: 'class',
      link: 'classes',
    },
  ]

  return (
    <>
      {!is800Screen ? (
        <Box
          sx={{
            borderRight: '1px solid #ccc',
            height: '100%',
            maxWidth: '250px',
          }}
        >
          <List sx={{ width: '200px' }}>
            {navItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  padding: 0,
                }}
              >
                <ListItemButton onClick={() => navigate('./' + item.link)}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <>
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)} sx={{
            width: 'fit-content',
            margin: '15px',
            marginBottom: '0',
          }}>
            <MenuIcon />
          </IconButton>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(!drawerOpen)}>
            <List
              sx={{
                width: '200px',
              }}
            >
              {navItems.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    padding: 0,
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      setDrawerOpen(false)
                      navigate('./' + item.link)
                    }}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      )}
    </>
  )
}

export default StaffPortalNav
