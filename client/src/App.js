import Header from './components/Header'
import HomePage from './components/HomePage'
import muiStyles from './styles/muiStyles'
import { Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer'
import SummerCamps from './components/camps/SummerCamps'
import SummerCampPage from './components/camps/SummerCampPage'

const { Box } = muiStyles

function App() {
  return (
    <div className="App">
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '64px',
          paddingBottom: '500px',
          // padding: '0px 10px',
        }}
      >
        <Box sx={{
          maxWidth: '1100px',
          paddingTop: '40px',
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/camps" element={<SummerCamps />} />
            <Route path="/camps/:campName" element={<SummerCampPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>

      {/* <Footer /> */}
    </div>
  )
}

export default App
