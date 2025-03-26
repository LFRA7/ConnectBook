import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';

export const CustomerServices = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

    return (
        <div className="app-container">
            <header className="header">
            <nav className="nav">
                    <div className="nav-left">
                        <button type="button" className="btn btn-light">ConnectBook</button>
                    </div>
                    <div className="nav-right">
                        <NavLink to="/" className="btn btn-primary btn-lg">Home</NavLink>
                        <NavLink to="/departments" className="btn btn-primary btn-lg">Departments</NavLink>
                        <NavLink to="/profile" className="btn btn-primary btn-lg">Profile</NavLink>
                        <NavLink to="/shop" className="btn btn-primary btn-lg">Shop </NavLink>
                        <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
                    </div>
                    
                </nav>
            </header>
        </div>
    );
}