import { useEffect, useState } from 'react';
import './Register.css';
import { NavLink } from "react-router";

export const Register = () => {
    const [username, setUsername] = useState(''); // Estado para armazenar o nome do pet
    const [email, setEmail] = useState(''); // Estado para armazenar o email do pet
    const [password, setPassword] = useState(''); // Estado para armazenar a senha do pet
    const [confirmpassword, setConfirmPassword] = useState(''); // Estado para armazenar a confirmação da senha do pet

      const addUser = () => {
        if (!username.trim()) {
          alert("Por favor, insira um nome para o pet.");
          return;
        }
    
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: username, // Usa o nome do input
            email: email,
            password: password,
            confirmPassword: confirmpassword
          })
        }).then(() => {
          setUsername(''); // Limpa o input após a adição do pet
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        });
      };
    
      useEffect(() => {
        fetch('http://localhost:3000/users')
          .then(response => response.json())
          .then(data => console.log(data));
      });

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
        <h2 className="register-title">Register</h2>
        <form className="register-form">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
            <input 
            type="text" 
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            class="form-control" 
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default"/>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input 
            type="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            class="form-control" 
            aria-label="Email" 
            aria-describedby="basic-addon1"/>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
            <input type="password" name="password" value={password}
            onChange={(e) => setPassword(e.target.value)} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Confirm Password</span>
            <input 
            type="password" 
            name="confirmPassword" 
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            class="form-control" 
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default"/>
          </div>
          <button type="submit" className="register-button" onClick={addUser}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
      </div>
        </>

        )   
      };
