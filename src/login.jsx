import { useEffect, useState } from 'react';
import { NavLink } from "react-router"
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Sling as Hamburger } from 'hamburger-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = (event) => {
    event.preventDefault(); // Evitar recarregamento da página

    if (!email || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Fazer uma requisição POST para o backend
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.error || 'Erro desconhecido');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Login bem-sucedido!', data);
      localStorage.setItem('token', data.token); // Salva o token no localStorage
      navigate('/shop'); // Redireciona para a página /shop
    })
    .catch(error => {
      console.error('Erro ao realizar login:', error.message);
      alert(error.message);
    });
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
              <NavLink to="/register" className="btn btn-primary btn-lg">Register</NavLink>
              <NavLink to="/login" className="btn btn-primary btn-lg">Login</NavLink>
            </div>
            {/* Menu hambúrguer */}
            <div className="menu-hamburger" onClick={() => setOpen(!isOpen)}>
              <Hamburger toggled={isOpen} toggle={setOpen} color={isOpen ? "#1a2a50" : "white"}/>
            </div>
                            
            {/* Slider Menu */}
            {isOpen && (
              <div className={`slider-menu ${isOpen ? "open" : ""}`}>
                <NavLink to="/register" className="dropdown-item" onClick={() => setOpen(false)}>Register</NavLink>
                <NavLink to="/login" className="dropdown-item" onClick={() => setOpen(false)}>Login</NavLink>
              </div>
            )}
          </nav>
        </header>

        <div className="login-container">
          <div className="login-box">
            <h2 className="login-title">Welcome Back</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="input-group mb-3">
              <input 
                placeholder="Email"
                type="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="go-email" 
                aria-label="Email" 
                aria-describedby="basic-addon1"
              />
              </div>
              <div className="input-group mb-3">
                <input 
                  placeholder="Password"
                  type="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  className="go-email" 
                  aria-label="Password" 
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};