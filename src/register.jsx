import { use, useEffect, useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom"; 

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [team, setTeam] = useState('');
    const navigate = useNavigate();

    const departmentTeams = {
        "Human Resources": ["Recruitment", "Employee Relations", "Training", "Payroll", "Compliance"],
        "Financial": ["Accounting", "Auditing", "Budgeting", "Investments", "Taxation"],
        "IT Services": ["Development", "Cybersecurity", "Support", "Cloud Services", "Networking"],
        "Marketing": ["Social Media", "SEO", "Branding", "Advertising", "Events"],
        "Administration": ["Office Management", "Legal", "Logistics", "Procurement", "Customer Service"]
    };

    const addUser = (event) => {
        event.preventDefault(); // Evita que a página seja recarregada(estava a dar erro quando redirecionava para o login)

        if (!username.trim() || !email.trim() || !password.trim() || !confirmpassword.trim() || !department.trim() || !team.trim()) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        if (password !== confirmpassword) {
            alert("As senhas não coincidem");
            return;
        }

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password,
                confirmPassword: confirmpassword,
                department: department,
                team: team
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                navigate("/login");
            }
        })
        .catch(error => console.error("Erro ao cadastrar usuário:", error));
    };

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => console.log(data));
    }, []); // [] evita loop infinito

    useEffect(() => {
        if (department) {
            setTeam('');
        }
    }, [department]);

    return (
        <div className="app-container">
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
                        <div className="input-group mb-3">
                            <span className="input-group-text">Username</span>
                            <input 
                                type="text" 
                                name="username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                className="form-control"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">@</span>
                            <input 
                                type="email" 
                                name="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className="form-control"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Password</span>
                            <input 
                                type="password" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className="form-control"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Confirm Password</span>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                className="form-control"/>
                        </div>
                        {/* Seletor de Departamento */}
                        <select className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
                            <option value="">Select your Department</option>
                            {Object.keys(departmentTeams).map((dep) => (
                                <option key={dep} value={dep}>{dep}</option>
                            ))}
                        </select>

                        {/* Seletor de Equipe (aparece somente quando um departamento é selecionado) */}
                        {department && (
                            <select className="form-select mt-2" value={team} onChange={(e) => setTeam(e.target.value)}>
                                <option value="">Select your Team</option>
                                {departmentTeams[department].map((teamName) => (
                                    <option key={teamName} value={teamName}>{teamName}</option>
                                ))}
                            </select>
                        )}
                        <button type="submit" className="register-button" onClick={addUser}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};