import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import '../app.css';
import './marketing.css';

export const Marketing = () => {
    const [teams, setTeams] = useState([]);
    const [isCompanyMode, setIsCompanyMode] = useState(true); // true = empresa, false = pessoal
    const [userStickers, setUserStickers] = useState([]);

    const [allTeams] = useState([
        "Social Media",
        "SEO",
        "Branding",
        "Advertising",
        "Events",
        "Market Research"
    ]); // Lista de todas as equipas

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                // Filtrar apenas users do departamento Marketing
                const MarketingUsers = data.filter(user => user.department === "Marketing");
                
                // Agrupar os users por equipa
                const groupedTeams = {};
                MarketingUsers.forEach(user => {
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
        navigate(`/departments/marketing/${teamName}`);
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
                        <NavLink to="/shop" className="btn btn-primary btn-lg">Shop</NavLink>
                        <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
                    </div>
                </nav>
            </header>

            <div className="title-marketing">
                <div className="title-row">
                    <h1>Marketing Department - {ownedUsers}/{totalUsers}</h1>
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
                                    className="card-marketing"
                                    onClick={() => handleCardClick(teamName)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="card-marketing-title">
                                        <h3>{teamName} - {visibleUsers.length}/{teamUsers.length}</h3>
                                    </div>
                                    <div className="sticker-container-marketing">
                                    {visibleUsers.length > 0 ? (
                                    <>
                                        {visibleUsers.slice(0, 5).map(user => (
                                            <div key={user.email} className="sticker-card">
                                                <img
                                                    src={`/stickers/${user.sticker}`}
                                                    alt={user.name}
                                                    className="sticker-image-marketing"
                                                />
                                                <h5>{user.name}</h5>
                                            </div>
                                        ))}

                                        {visibleUsers.length > 5 && (
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
