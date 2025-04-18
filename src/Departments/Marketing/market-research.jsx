import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react';
import '../teams.css';

export const MarketResearch = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setOpen] = useState(false);
    const [isCompanyMode, setIsCompanyMode] = useState(true); // Modo empresa/pessoal
    const [userStickers, setUserStickers] = useState([]); // Stickers do user

    const membersPerPage = 8; // Número de membros por página

    useEffect(() => {
        const teamDescription = "The market research team is responsible for gathering and analyzing data about consumers, competitors, and industry trends. We conduct surveys, interviews, and data analysis to provide insights that help the company make informed decisions, improve products, and develop effective marketing strategies.";
        setDescription(teamDescription);
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                const advertisingTeam = data.filter(user => user.department === "Marketing" && user.team === "Market Research");
                setTeamMembers(advertisingTeam);
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
                })
                .catch(error => console.error('Erro ao procurar perfil:', error));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Aplicar filtro conforme o modo
    const visibleMembers = isCompanyMode
        ? teamMembers
        : teamMembers.filter(user =>
            userStickers.some(s => s.name === user.name)
        );

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = visibleMembers.slice(indexOfFirstMember, indexOfLastMember);

    const totalPages = Math.ceil(visibleMembers.length / membersPerPage);

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
                    <div className="menu-hamburger" onClick={() => setOpen(!isOpen)}>
                        <Hamburger toggled={isOpen} toggle={setOpen} color={isOpen ? "#1a2a50" : "white"} />
                    </div>
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

            <div className="title-teams">
                <div className="title-row-teams">
                <h1>Market Research - {visibleMembers.length}/{teamMembers.length}</h1>
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
                            <div className="colaborators-team-header">
                                <h3>Team Members</h3>
                            </div>
                            {currentMembers.length > 0 ? (
                                <div className="team-members-list">
                                    {currentMembers.map(member => (
                                        <div key={member.email} className="team-member">
                                            <img src={`/stickers/${member.sticker}`} alt={member.name} className="sticker-img" />
                                            <p>{member.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No members found.</p>
                            )}

                            <nav aria-label="Page navigation" className="pagination-container fixed-pagination">
                                <ul className="pagination">
                                    {/* Seta da esquerda */}
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        >
                                            <span className="seta-esquerda" aria-hidden="true">◂</span>
                                        </button>
                                    </li>

                                    {/* Número 1 */}
                                    <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(1)}
                                        >
                                            1
                                        </button>
                                    </li>

                                    {/* Reticências antes dos números do meio */}
                                    {currentPage > 3 && totalPages > 5 && (
                                        <li className="page-item disabled">
                                            <span className="page-link">...</span>
                                        </li>
                                    )}

                                    {/* Números do meio */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(page =>
                                            page !== 1 && // Já exibimos o número 1
                                            page !== totalPages && // O último número será exibido separadamente
                                            (totalPages <= 5 || // Se totalPages <= 5, exibe todos os números
                                                (page >= currentPage - 1 && page <= currentPage + 1)) // Caso contrário, exibe 3 números ao redor da página atual
                                        )
                                        .map(page => (
                                            <li
                                                key={page}
                                                className={`page-item ${currentPage === page ? "active" : ""}`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        ))}

                                    {/* Reticências depois dos números do meio */}
                                    {currentPage < totalPages - 2 && totalPages > 5 && (
                                        <li className="page-item disabled">
                                            <span className="page-link">...</span>
                                        </li>
                                    )}

                                    {/* Último número */}
                                    {totalPages > 1 && (
                                        <li className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(totalPages)}
                                            >
                                                {totalPages}
                                            </button>
                                        </li>
                                    )}

                                    {/* Seta da direita */}
                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        >
                                            <span className="seta-direita" aria-hidden="true">▸</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="go-back" onClick={() => navigate('/departments/marketing')}>
                            <h4>Go Back</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
