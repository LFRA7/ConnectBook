import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import './app.css';
import './marketing.css';

export const Marketing = () => {
    const [teams, setTeams] = useState([]);

    const [allTeams] = useState([
        "Social Media",
        "SEO",
        "Branding",
        "Advertising",
        "Events",
        "Market Research"
    ]); // Lista de todas as equipas

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                // Filtrar apenas usuários do departamento Administration
                const adminUsers = data.filter(user => user.department === "Marketing");
                
                // Agrupar os usuários por equipe
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
            <div className="title-marketing">
                <h1>Marketing Department</h1>
            </div>
                            
            <div class="container text-center">
                <div class="row">
                {allTeams.map((teamName) => (
                        <div className="col" key={teamName}>
                            <div className="card-marketing">
                                <div className="card-marketing-title">
                                    <h3>{teamName}</h3> {/* Título da equipa */}
                                </div>
                                <div className="sticker-container-marketing">
                                    {teams[teamName] && teams[teamName].length > 0 ? (
                                        teams[teamName].map(user => (
                                            <div key={user.email} className="sticker-card">
                                            <img 
                                                key={user.email} 
                                                src={`/stickers/${user.sticker}`} 
                                                alt={user.name} 
                                                className="sticker-image"
                                            />
                                            <h5>{user.name}</h5> {/* Nome do usuário abaixo do sticker */}
                                            </div>
                                        ))
                                    ) : (
                                        <h5>Nenhum colaborador para esta equipa.</h5> // Exibe mensagem se não houver colaboradores
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </div>
    );
};
