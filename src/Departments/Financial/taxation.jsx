import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../teams.css';

export const Taxation = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        // Simulação de carregamento da descrição
        const teamDescription = "The Taxation Team is responsible for managing the company’s tax obligations, ensuring compliance with local and international tax regulations, and optimizing tax strategies to enhance financial efficiency. This team works closely with internal and external stakeholders to minimize tax risks, maximize savings, and ensure accurate reporting.";
        setDescription(teamDescription);
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                const advertisingTeam = data.filter(user => user.department === "Financial" && user.team === "Taxation");  
                setTeamMembers(advertisingTeam);
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

            <div className="title-teams">
                <h1>Taxation</h1>
            </div>

            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <div className="description-team">
                            <h3>Description</h3>
                            <div className="description-text-wrapper">
                                <h6>{description}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                    <div className="colaborators-team">
                    <h3>Team Members</h3>
                    {teamMembers.length > 0 ? (
                        <div className="team-members-list">
                            {teamMembers.map(member => (
                                <div key={member.email} className="team-member">
                                    <img src={`/stickers/${member.sticker}`} alt={member.name} className="sticker-img" />
                                    <p>{member.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No members found.</p>
                    )}
                    </div>
                        <div className="go-back" onClick={() => navigate('/departments/financial')}>
                            <h4>Go Back</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}