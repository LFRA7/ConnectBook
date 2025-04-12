import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../teams.css';

export const EmployeeRelations = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        // Simulação de carregamento da descrição
        const teamDescription = "The Employee Relations Team is responsible for fostering a positive work environment by managing relationships between employees and the organization. This team ensures fair treatment, resolves workplace conflicts, and upholds company policies in alignment with labor laws and best practices.";
        setDescription(teamDescription);
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                const advertisingTeam = data.filter(user => user.department === "Human Resources" && user.team === "Employee Relations");  
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
                        <button type="button" className="btn btn-light" onClick={() => navigate('/')}>ConnectBook</button>
                    </div>
                    <div className="nav-right">
                        <NavLink to="/departments" className="btn btn-primary btn-lg">Departments</NavLink>
                        <NavLink to="/profile" className="btn btn-primary btn-lg">Profile</NavLink>
                        <NavLink to="/shop" className="btn btn-primary btn-lg">Shop </NavLink>
                        <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
                    </div>
                </nav>
            </header>

            <div className="title-teams">
                <h1>Employee Relations</h1>
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
                        <div className="go-back" onClick={() => navigate('/departments/human-resources')}>
                            <h4>Go Back</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}