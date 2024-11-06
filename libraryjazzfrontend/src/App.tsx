import './App.css'
import NavBar from './components/NavBar'
import AboutPage from './pages/AboutPage'
import Landing from './pages/Landing'

function App() {

  return (
    <>
    <div className="App">
      <div className='sticky top-0'>
        <NavBar/>
      </div>
      <div>
        <Landing/>
        <AboutPage/>
      </div>
    </div>
   
    </>
  )
}

export default App
