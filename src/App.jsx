import { NavLink } from "react-router"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const navigate = useNavigate(); 
  const [stickers, setStickers] = useState([]);
  const isLoggedIn = localStorage.getItem('token'); // ou outro critério

  useEffect(() => {
    const loadStickers = async () => {
      const stickerList = [
        "Sticker4.png",
        "Sticker7.png",
        "Sticker10.png",
        "Sticker16.png",
        "Sticker18.png",
      ];
        setStickers(stickerList);
    };
    loadStickers();
  }, []);

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
          <>
            <NavLink to="/departments" className="btn btn-primary btn-lg">Departments</NavLink>
            <NavLink to="/profile" className="btn btn-primary btn-lg">Profile</NavLink>
            <NavLink to="/shop" className="btn btn-primary btn-lg">Shop</NavLink>
            <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
          </>
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

        <div className="stickers-container">
          {stickers.map((sticker, index) => (
            <img
              key={index}
              src={`/stickers/${sticker}`}
              alt={`Sticker ${index + 1}`}
              className="sticker-home"
            />
          ))}
        </div>
        <div className="title-container-home-department">
          <h2 className="home-department">Department</h2>
        </div>

        <div className="departments-container-home">
          <div className="department-card-home">
            <img src="/src/assets/human_resources.png" alt="Human Resources" className="department-icon-home" />
            <p>Human Resources</p>
          </div>
          
          <div className="department-card-home">
            <img src="/src/assets/financial.png" alt="Financial" className="department-icon" />
            <p>Financial</p>
          </div>

          <div className="department-card-home">
            <img src="/src/assets/it_services.png" alt="IT Services" className="department-icon" />
            <p>IT Services</p>
          </div>

          <div className="department-card-home">
            <img src="/src/assets/marketing.png" alt="Marketing" className="department-icon" />
            <p>Marketing</p>
          </div>

          <div className="department-card-home">
          <img src="/src/assets/administration.png" alt="Administration" className="department-icon" />
          <p>Administration</p>
          </div>

        </div>
      </div>
      </div>
    </>
  )
}

export default App
