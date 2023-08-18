import Header from './components/Header'
import HomePage from './components/HomePage'
import muiStyles from './styles/muiStyles'
import { Routes, Route, Navigate } from 'react-router-dom'
import Classes from './components/classes/Classes'
import ClassPage from './components/classes/ClassPage'
import StaffPortalDirector from './components/staff-components/StaffPortalDirector'
import '../src/components/staff-components/staff.css'
import '../src/components/classes/classes.css'
import { Authentication } from './context/AuthContext'

const { Box } = muiStyles

function App() {
  return (
    <Authentication>
      <div className='App'>
        <Header />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/classes' element={<Classes />} />
          <Route path='/classes/:className' element={<ClassPage />} />
          <Route path='/staff/*' element={<StaffPortalDirector />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </Authentication>
  )
}

export default App
