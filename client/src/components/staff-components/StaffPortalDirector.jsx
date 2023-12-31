import React, { useState, useContext, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from './staff-auth/LoginPage'
import SignupPage from './staff-auth/SignupPage'
import Dashboard from './dashboard/Dashboard'
import StaffPortalNav from './StaffPortalNav'
import muiStyles from '../../styles/muiStyles'
import { StaffContextFunction } from '../../context/StaffContext'
import ClassesManagement from './classes/ClassesManagement'
import Footer from '../Footer'
import { useMediaQuery } from '@mui/material'
import ForgotPassword from './staff-auth/ForgotPassword'
import ResetPasswordPage from './staff-auth/ResetPasswordPage'
const { Box } = muiStyles

const StaffPortalDirector = () => {
  const { authState } = useContext(AuthContext)
  const [portalNavOpen, setPortalNavOpen] = useState(false)
  const is800Screen = useMediaQuery('(max-width:800px)')

  useEffect(() => {
    document.title = 'Malena Hirst - Staff Portal'
  }, [])

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
    <>
      {authState === 'AUTHENTICATED' ? (
        <StaffContextFunction>
          <Box
            sx={{
              display: 'flex',
              height: 'calc(100vh - 70px)',
              flexDirection: is800Screen ? 'column' : 'row',
            }}
          >
            <StaffPortalNav
              drawerOpen={portalNavOpen}
              setDrawerOpen={setPortalNavOpen}
            />
            <Box
              sx={{
                maxHeight: 'calc(100vh - 70px)',
                overflowY: 'auto',
                width: '100%',
              }}
            >
              <Routes>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='classes' element={<ClassesManagement />} />
                <Route path='*' element={<Navigate to='classes' />} />
              </Routes>
              <Footer />
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
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPasswordPage />} />
            <Route path='*' element={<Navigate to='login' />} />
          </Routes>
          <Footer />
        </Box>
      )}
    </>
  )
}

export default StaffPortalDirector
