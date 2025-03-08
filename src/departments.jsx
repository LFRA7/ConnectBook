import React from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './departments.css';

export const Departments = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <div className="app-container">
                <header className="header">
                    <nav className="nav">
                        <div className="nav-left">
                            <button type="button" className="btn btn-light">ConnectBook</button>
                        </div>
                        <div className="nav-right">
                            <NavLink to="/" className="btn btn-primary btn-lg">Home</NavLink>
                            <NavLink to="/profile" className="btn btn-primary btn-lg">Profile</NavLink>
                            <NavLink to="/shop" className="btn btn-primary btn-lg">Shop </NavLink>
                            <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
                        </div>
                    </nav>
                </header>
                <h1>Departments</h1>
                <div className="departments-container">
  <NavLink to="/departments/human-resources" className="department-card">
    <img src="/src/assets/human_resources.png" alt="Human Resources" className="department-icon" />
    <p>Human Resources</p>
  </NavLink>
  <NavLink to="/departments/financial" className="department-card">
    <img src="/src/assets/financial.png" alt="Financial" className="department-icon" />
    <p>Financial</p>
  </NavLink>
  <NavLink to="/departments/it-services" className="department-card">
    <img src="/src/assets/it_services.png" alt="IT Services" className="department-icon" />
    <p>IT Services</p>
  </NavLink>
  <NavLink to="/departments/marketing" className="department-card">
    <img src="/src/assets/marketing.png" alt="Marketing" className="department-icon" />
    <p>Marketing</p>
  </NavLink>
  <NavLink to="/departments/administration" className="department-card">
    <img src="/src/assets/administration.png" alt="Administration" className="department-icon" />
    <p>Administration</p>
  </NavLink>
</div>
            </div>
        </>
    );
};
