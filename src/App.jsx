import { NavLink } from "react-router-dom"; // Corrigir para 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [stickers, setStickers] = useState([]);
  const isLoggedIn = localStorage.getItem('token');
  const [isOpen, setOpen] = useState(false);

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

          {/* Menu hambúrguer */}
          <div className="menu-hamburger" onClick={() => setOpen(!isOpen)}>
            <Hamburger toggled={isOpen} toggle={setOpen} color={isOpen ? "#1a2a50" : "white"}/>
          </div>

          {/* Slider Menu */}
          {isOpen && (
            <div className={`slider-menu ${isOpen ? "open" : ""}`}>
              {isLoggedIn ? (
                <>
                  <NavLink to="/departments" className="dropdown-item" onClick={() => setOpen(false)}>Departments</NavLink>
                  <NavLink to="/profile" className="dropdown-item" onClick={() => setOpen(false)}>Profile</NavLink>
                  <NavLink to="/shop" className="dropdown-item" onClick={() => setOpen(false)}>Shop</NavLink>
                  <button onClick={() => { handleLogout(); setOpen(false); }} className="dropdown-item">Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/register" className="dropdown-item" onClick={() => setOpen(false)}>Register</NavLink>
                  <NavLink to="/login" className="dropdown-item" onClick={() => setOpen(false)}>Login</NavLink>
                </>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Home */}
      <div className="home-container">
        <div className="home-box">
          <h2 className="home-title">Get Started</h2>
          <button type="button" className="go-button" onClick={() => navigate('/register')}>Register</button>
          <h2 className="home-title">OR</h2>
          <button type="button" className="go-button" onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>

      {/* Stickers */}
      <div className="second-page">
        <div className="stickers-container">
          {stickers.map((sticker, index) => (
            <img key={index} src={`/stickers/${sticker}`} alt={`Sticker ${index + 1}`} className="sticker-home" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
