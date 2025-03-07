import { NavLink } from "react-router"

export const Login = () => {
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
      <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Welcome Back</h2>
        <form className="register-form">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input type="email" name="email" class="form-control" aria-label="Email" aria-describedby="basic-addon1"/>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
            <input type="password" name="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
          </div>
          <button type="submit" className="register-button">
            Login
          </button>
        </form>
      </div>
    </div>
      </div>

    </>
  )
  
};