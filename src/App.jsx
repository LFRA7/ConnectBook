
import { NavLink } from "react-router"
import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const navigate = useNavigate(); 
  const isLoggedIn = localStorage.getItem('token'); // ou outro critério

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>

      <div className="app-container">
      {/* Header */}
      <header className="header">
        <nav className="nav">
         <div className="nav-left">
         <button type="button" className="btn btn-light" onClick={() => navigate('/')}>ConnectBook</button>
        </div>
        <div className="nav-right">
      {isLoggedIn ? (
        <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
      ) : (
        <>
          <NavLink to="/register" className="btn btn-primary btn-lg">Register</NavLink>
          <NavLink to="/login" className="btn btn-primary btn-lg">Login</NavLink>
        </>
      )}
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

      <div className="second-page">
        <div className="title-container-team-assignment">
          <h2 className="team-assignment">Team Assignment</h2>
        </div>
      </div>

      </div>

    </>
  )
}

export default App
