import { useEffect, useState } from 'react';
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
    const [stickers, setStickers] = useState([]);
    const [selectedSticker, setSelectedSticker] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const stickersPerPage = 6;
    const navigate = useNavigate();

    const departmentTeams = {
        "Human Resources": ["Recruitment", "Employee Relations", "Training", "Payroll", "Compliance", "Employee Engagement"],
        "Financial": ["Accounting", "Auditing", "Budgeting", "Investments", "Taxation", "Financial Planning"],
        "IT Services": ["Development", "Cybersecurity", "Support", "Cloud Services", "Networking", "Data Analytics"],
        "Marketing": ["Social Media", "SEO", "Branding", "Advertising", "Events", "Market Research"],
        "Administration": ["Office Management", "Legal", "Logistics", "Procurement", "Customer Service", "Facilities Management"]
    };

    useEffect(() => {
        const loadStickers = async () => {
            const stickerList = [
                "Sticker1.png",
                "Sticker2.png",
                "Sticker3.png",
                "Sticker4.png",
                "Sticker5.png",
                "Sticker6.png",
                "Sticker7.png",
                "Sticker8.png",
                "Sticker9.png",
                "Sticker10.png",
                "Sticker11.png",
                "Sticker12.png",
                "Sticker13.png",
                "Sticker14.png",
                "Sticker15.png",
                "Sticker16.png",
                "Sticker17.png",
                "Sticker18.png",
            ];
            setStickers(stickerList);
        };
        loadStickers();
    }, []);

    const addUser = (event) => {
        event.preventDefault(); // Evita que a página seja recarregada(estava a dar erro quando redirecionava para o login)

        if (!username.trim() || !email.trim() || !password.trim() || !confirmpassword.trim() || !department.trim() || !team.trim() || !selectedSticker) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        if (password !== confirmpassword) {
            alert("As senhas não coincidem");
            return;
        }

        console.log("Enviando dados:", {
            name: username,
            email: email,
            password: password,
            confirmPassword: confirmpassword,
            department: department,
            team: team,
            sticker: selectedSticker
        });

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
                team: team,
                sticker: selectedSticker
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
        .catch(error => console.error("Erro ao registrar usuário:", error));
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

    // Pagination
    const indexOfLastSticker = currentPage * stickersPerPage;
    const indexOfFirstSticker = indexOfLastSticker - stickersPerPage;
    const currentStickers = stickers.slice(indexOfFirstSticker, indexOfLastSticker);
    const totalPages = Math.ceil(stickers.length / stickersPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
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
                        <NavLink to="/register" className="btn btn-primary btn-lg">Register</NavLink>
                        <NavLink to="/login" className="btn btn-primary btn-lg">Login</NavLink>
                    </div>
                </nav>
            </header>
            <div className="register-container">
                <div className="register-box">
                    <h2 className="register-title">Register</h2>
                    <form className="register-form">
                    <div class="row">
                    <div class="col">
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
                        {/* Selecionar Departamento */}
                        <select className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
                            <option value="">Select your Department</option>
                            {Object.keys(departmentTeams).map((dep) => (
                                <option key={dep} value={dep}>{dep}</option>
                            ))}
                        </select>

                        {/* Selecionar Equipa (sempre visível, mas desativado sem departamento) */}
                        <select 
                            className="form-select mt-2" 
                            value={team} 
                            onChange={(e) => setTeam(e.target.value)} 
                            disabled={!department} // Desativa o select quando nenhum departamento é escolhido
                        >
                            <option value="">Select your Team</option>
                            {department && departmentTeams[department] ? (
                                departmentTeams[department].map((teamName) => (
                                    <option key={teamName} value={teamName}>{teamName}</option>
                                ))
                            ) : null}
                        </select>

                        </div>
                        <div class="col">
                        {/* Selecionar Sticker */}
                        <div className="sticker-container">
                        <h3>Choose your Sticker</h3>
                        <div className="sticker-selection">
                            {currentStickers.map((sticker, index) => (
                                <img 
                                    key={index} 
                                    src={`/stickers/${sticker}`} 
                                    alt={`Sticker ${index + 1}`} 
                                    className={selectedSticker === sticker ? "sticker selected" : "sticker"}
                                    onClick={() => setSelectedSticker(sticker)}
                                />
                            ))}
                        </div>
                        {/* Paginação */}
                        <nav aria-label="Sticker pagination" className="mt-3">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage - 1);
                                        }}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li className={`page-item ${currentPage === i + 1 ? "active" : ""}`} key={i}>
                                        <button
                                            className="page-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(i + 1);
                                            }}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage + 1);
                                        }}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        </div>
                        </div>
                        <button type="submit" className="register-button" onClick={addUser}>
                            Sign Up
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};