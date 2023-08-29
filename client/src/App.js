import Header from './components/Header'
import HomePage from './components/HomePage'
import { Routes, Route, Navigate } from 'react-router-dom'
import Classes from './components/classes/Classes'
import ClassPage from './components/classes/ClassPage'
import StaffPortalDirector from './components/staff-components/StaffPortalDirector'
import './components/staff-components/staff.css'
import './components/classes/classes.css'
import './components/public.css'
import { ToastContainer } from 'react-toastify'
import { Authentication } from './context/AuthContext'
import ContactMePage from './components/contact/ContactMePage'

function App() {
  return (
    <>
      <ToastContainer
        position='top-center'
        newestOnTop
        draggable
        hideProgressBar={false}
        autoClose={4000}
        pauseOnHover
        pauseOnFocusLoss={false}
        theme='light'
      />
      <Authentication>
        <div className='App'>
          <Header />

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/classes' element={<Classes />} />
            <Route path='/classes/:className' element={<ClassPage />} />
            <Route path='/contact' element={<ContactMePage />} />
            <Route path='/staff/*' element={<StaffPortalDirector />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </Authentication>
    </>
  )
}

export default App
