import './App.css'
import NavBar from './components/NavBar'
import AboutPage from './pages/AboutPage'

function App() {

  return (
    <>
    <div className="App">
      <div className='sticky top-0'>
        <NavBar/>
      </div>
      <div>
        <AboutPage/>
      </div>
    </div>
   
    </>
  )
}

export default App
