import './App.css'
import { NavLink } from "react-router"

function App() {

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
      </div>
    </>
  )
}

export default App
