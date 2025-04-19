import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react';
import '../app.css';
import './financial.css';

export const Financial = () => {
    const [teams, setTeams] = useState([]);
    const [isCompanyMode, setIsCompanyMode] = useState(true); // true = empresa, false = pessoal
    const [userStickers, setUserStickers] = useState([]);
    const [isOpen, setOpen] = useState(false);

    const [allTeams] = useState([
        "Accounting",
        "Auditing",
        "Budgeting",
        "Investments",
        "Taxation",
        "Financial Planning"
    ]); // Lista de todas as equipas

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                // Filtrar apenas usuários do departamento Financial
                const FinancialUsers = data.filter(user => user.department === "Financial");
                
                // Agrupar os usuários por equipa
                const groupedTeams = {};
                FinancialUsers.forEach(user => {
                    if (!groupedTeams[user.team]) {
                        groupedTeams[user.team] = [];
                    }
                    groupedTeams[user.team].push(user);
                });

                setTeams(groupedTeams);
            })
            .catch(error => console.error("Erro ao procurar Colaboradores:", error));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:3000/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.stickers) {
                        setUserStickers(data.stickers);
                    }
                    if (data.name) {
                        setUserData({ name: data.name});
                    }
                })
                .catch(error => console.error('Erro ao procurar perfil:', error));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

    const handleCardClick = (teamName) => {
        navigate(`/departments/financial/${teamName}`);
    }

    const allUsersInDepartment = Object.values(teams).flat();
    const totalUsers = allUsersInDepartment.length;

    const ownedUsers = isCompanyMode
        ? totalUsers
        : allUsersInDepartment.filter(user =>
            userStickers.some(s => s.name === user.name)
        ).length;

    return (
        <div className="app-container">
            <header className="header">
            <nav className="nav">
                    <div className="nav-left">
                        <button type="button" className="btn btn-light" onClick={() => navigate('/')}>ConnectBook</button>
                    </div>
                    <div className="nav-right">
                        <NavLink to="/departments" className="btn btn-primary btn-lg">Departments</NavLink>
                        <NavLink to="/profile" className="btn btn-primary btn-lg">Profile</NavLink>
                        <NavLink to="/shop" className="btn btn-primary btn-lg">Shop </NavLink>
                        <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
                    </div>
                    
                    {/* Menu hambúrguer */}
                    <div className="menu-hamburger" onClick={() => setOpen(!isOpen)}>
                        <Hamburger toggled={isOpen} toggle={setOpen} color={isOpen ? "#1a2a50" : "white"}/>
                    </div>
                            
                    {/* Slider Menu */}
                    {isOpen && (
                        <div className={`slider-menu ${isOpen ? "open" : ""}`}>
                            <NavLink to="/departments" className="dropdown-item" onClick={() => setOpen(false)}>Departments</NavLink>
                            <NavLink to="/profile" className="dropdown-item" onClick={() => setOpen(false)}>Profile</NavLink>
                            <NavLink to="/shop" className="dropdown-item" onClick={() => setOpen(false)}>Shop</NavLink>
                            <button onClick={() => { handleLogout(); setOpen(false); }} className="dropdown-item">Logout</button>
                        </div>
                    )}

                </nav>
            </header>

            <div className="title-financial">
                <div className="title-row">
                    <h1>Financial Department - {ownedUsers}/{totalUsers}</h1>
                    <div className="mode-toggle">
                        <button
                            className={`btn btn-${isCompanyMode ? 'secondary' : 'success'}`}
                            onClick={() => setIsCompanyMode(!isCompanyMode)}
                        >
                        {isCompanyMode ? "Company" : "Personal"} Mode
                        </button>
                    </div>
                </div>
            </div>

            <div className="container text-center">
                <div className="row">
                    {allTeams.map((teamName) => {
                        // Obter colaboradores da equipa atual
                        const teamUsers = teams[teamName] || [];

                        // Filtrar por modo
                        const visibleUsers = isCompanyMode
                            ? teamUsers
                            : teamUsers.filter(user =>
                                userStickers.some(s => s.name === user.name)
                                );

                        return (
                            <div className="col" key={teamName}>
                                <div
                                    className="card-financial"
                                    onClick={() => handleCardClick(teamName)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="card-financial-title">
                                        <h3>{teamName} - {visibleUsers.length}/{teamUsers.length}</h3>
                                    </div>
                                    <div className="sticker-container-financial">
                                    {visibleUsers.length > 0 ? (
                                    <>
                                        {visibleUsers.slice(0, visibleUsers.length > 6 ? 5 : 6).map(user => (
                                            <div key={user.email} className="sticker-card">
                                                <img
                                                    src={`/stickers/${user.sticker}`}
                                                    alt={user.name}
                                                    className="sticker-image-financial"
                                                />
                                                <h5>{user.name}</h5>
                                            </div>
                                        ))}

                                        {visibleUsers.length > 6 && (
                                            <div className="sticker-extra-bola">
                                                <div className="sticker-card extra-stickers">
                                                    <h3>+{visibleUsers.length - 5}</h3>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <h5>Nenhum colaborador para esta equipa.</h5>
                                )}

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>  
            
        </div>
    );
};