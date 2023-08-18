import React, { useState, useContext, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from './staff-auth/LoginPage'
import SignupPage from './staff-auth/SignupPage'
import Dashboard from './dashboard/Dashboard'
import StaffPortalNav from './StaffPortalNav'
import muiStyles from '../../styles/muiStyles'
import { StaffContextFunction } from '../../context/StaffContext'
import Signups from './classes/Signups'
const { Box } = muiStyles

const StaffPortalDirector = () => {
  const { authState } = useContext(AuthContext)
  const [portalNavOpen, setPortalNavOpen] = useState(false)

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
      <ToastContainer
        position='top-center'
        newestOnTop
        draggable
        hideProgressBar={false}
        autoClose={3500}
        pauseOnHover
        pauseOnFocusLoss={false}
        theme='light'
      />
      {authState === 'AUTHENTICATED' ? (
        <StaffContextFunction>
          <Box
            sx={{
              display: 'flex',
              height: 'calc(100vh - 70px)',
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
                <Route path='classes' element={<Signups />} />
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
    </>
  )
}

export default StaffPortalDirector
