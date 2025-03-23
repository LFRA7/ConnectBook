
import { NavLink } from "react-router"
import { useNavigate } from 'react-router-dom';
import './App.css'
import Sticker1 from './assets/Sticker1.png'
import Sticker2 from './assets/Sticker2.png'
import Sticker3 from './assets/Sticker3.png'

function App() {
  const navigate = useNavigate(); 

  return (
    <>

      <div className="app-container">
      {/* Header */}
      <header className="header">
        <nav className="nav">
         <div className="nav-left">
         <button type="button" className="btn btn-light">ConnectBook</button>
        </div>
        <div className="nav-right">
          <NavLink to="/" className="btn btn-primary btn-lg">Home</NavLink>
          <NavLink to="/register" className="btn btn-primary btn-lg">Register</NavLink>
          <NavLink to="/login" className="btn btn-primary btn-lg">Login</NavLink>
        </div>
        </nav>
      </header>

      <div className="home-container">
        <div className="home-box">
          <h2 className="home-title">Get Started</h2>
        <button type="button" className="go-button" onClick={() => navigate('/register')}>
          Register
        </button>
          <h2 className="home-title">OR</h2>
          <button type="button" className="go-button" onClick={() => navigate('/login')}>
          Login
        </button>
        </div>
      </div>


      <h1>Team Assignment</h1>
      </div>

    </>
  )
}

export default App
