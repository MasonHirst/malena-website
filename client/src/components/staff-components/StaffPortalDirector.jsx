import React, { useState, useContext, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import LoginPage from './staff-auth/LoginPage'
import SignupPage from './staff-auth/SignupPage'
import Dashboard from './Dashboard'
import DashboardNav from './DashboardNav'
import { useMediaQuery } from '@mui/material'
import muiStyles from '../../styles/muiStyles'
import Classes from './Classes'
import { StaffContextFunction } from '../../context/StaffContext'
const { Box } = muiStyles

const StaffPortalDirector = () => {
  const { authState } = useContext(AuthContext)
  const [dashboardNavOpen, setDashboardNavOpen] = useState(false)
  const is800Screen = useMediaQuery('(max-width:800px)')

  if (authState === 'LOADING') {
    return (
      <h2
        style={{
          position: 'fixed',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        Auth state Loading...
      </h2>
    )
  }

  return (
    <div>
      {authState === 'AUTHENTICATED' ? (
        <StaffContextFunction>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              height: 'calc(100vh - 70px)',
            }}
          >
            <DashboardNav
              drawerOpen={dashboardNavOpen}
              setDrawerOpen={setDashboardNavOpen}
            />
            <Box
              sx={{
                maxHeight: 'calc(100vh - 70px)',
                overflowY: 'auto',
                paddingTop: '35px',
              }}
            >
              <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/classes' element={<Classes />} />
                {/* <Route path='*' element={<Navigate to='dashboard' />} /> */}
                <Route path='*' element={<Navigate to='classes' />} />
              </Routes>
            </Box>
          </Box>
        </StaffContextFunction>
      ) : (
        <Box
          sx={{
            marginTop: '50px',
          }}
        >
          <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path='new-admin' element={<SignupPage />} />
            <Route path='*' element={<Navigate to='login' />} />
          </Routes>
        </Box>
      )}
    </div>
  )
}

export default StaffPortalDirector
