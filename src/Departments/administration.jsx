import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './administration.css';

export const Administration = () => {
    const [teams, setTeams] = useState([]);

    const [allTeams] = useState([
        "Office Management",
        "Legal",
        "Logistics",
        "Procurement",
        "Customer Services",
        "Facilities Management"
    ]); // Lista de todas as equipas

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                // Filtrar apenas usuários do departamento Administration
                const adminUsers = data.filter(user => user.department === "Administration");
                
                // Agrupar os usuários por equipa
                const groupedTeams = {};
                adminUsers.forEach(user => {
                    if (!groupedTeams[user.team]) {
                        groupedTeams[user.team] = [];
                    }
                    groupedTeams[user.team].push(user);
                });

                setTeams(groupedTeams);
            })
            .catch(error => console.error("Erro ao procurar Colaboradores:", error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

    const handleCardClick = (teamName) => {
        navigate(`/departments/administration/${teamName}`);
    }

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
                        <NavLink to="/departments" className="btn btn-primary btn-lg">Departments</NavLink>
                        <NavLink to="/profile" className="btn btn-primary btn-lg">Profile</NavLink>
                        <NavLink to="/shop" className="btn btn-primary btn-lg">Shop </NavLink>
                        <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
                    </div>
                    
                </nav>
            </header>
            <div className="title-administration">
                <h1>Administration Department</h1>
            </div>

            <div className="container text-center">
                <div className="row">
                {allTeams.map((teamName) => (
                        <div className="col" key={teamName}>
                            <div className="card-administration" onClick={() => handleCardClick(teamName)} style={{ cursor: "pointer" }}>
                                <div className="card-administration-title">
                                    <h3>{teamName}</h3>
                                </div>
                                <div className="sticker-container-administration">
                                {teams[teamName] && teams[teamName].length > 0 ? (
                                    <>
                                        {teams[teamName].slice(0, teams[teamName].length > 6 ? 5 : 6).map(user => ( 
                                            <div key={user.email} className="sticker-card">
                                                <img 
                                                    src={`/stickers/${user.sticker}`} 
                                                    alt={user.name} 
                                                    className="sticker-image-administration"
                                                />
                                                <h5>{user.name}</h5>
                                            </div>
                                        ))}
                                        {teams[teamName].length > 6 && ( // Só exibe a bola +x se houver mais de 6 membros
                                            <div className="sticker-extra-bola">
                                                <div className="sticker-card extra-stickers">
                                                    <h3>+{teams[teamName].length - 5}</h3> 
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
                    ))}
                </div>
            </div>
    </div>
    </>
    );
};