import Header from './components/Header'
import HomePage from './components/HomePage'
import Footer from './components/Footer'

function App() {
  return (
    <div
      className="App"
    >
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '64px',
          padding: '0px 10px',
        }}
      >
        <div className="pages-container-main">
          <HomePage />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
