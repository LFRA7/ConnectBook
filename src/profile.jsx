import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react';
import './profile.css';

export const Profile = () => {
    const navigate = useNavigate();
    const [stickers, setStickers] = useState([]);
    const [userData, setUserData] = useState({ name: '', stickersCount: 0 });
    const [isOpen, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const stickersPerPage = 20;

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
                    setStickers(data.stickers);
                }
                if (data.name) {
                    setUserData({ name: data.name, stickersCount: data.stickers ? data.stickers.length : 0  });
                }

            })
            .catch(error => console.error('Erro ao procurar stickers:', error));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Calculate pagination
    const indexOfLastSticker = currentPage * stickersPerPage;
    const indexOfFirstSticker = indexOfLastSticker - stickersPerPage;
    const currentStickers = stickers.slice(indexOfFirstSticker, indexOfLastSticker);
    const totalPages = Math.ceil(stickers.length / stickersPerPage);

    return(
        <>
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
            <div className="title-profile">
            <h1>Hello {userData.name}, you have {userData.stickersCount} Stickers</h1>
            </div>
            <div className="full-width-bar"></div>
            <div className="title-profile-h2">
            <h2>Stickers</h2>
            </div>
            <div className="full-width-bar"></div>
            <div className="stickers-container-profile">
                {currentStickers.length > 0 ? currentStickers.map((sticker, index) => (
                    <div key={index} className={`sticker-box border-${sticker.rarity || 'common'}`}>
                        <img 
                            src={`/stickers/${sticker.sticker}`} 
                            alt={`Sticker de ${sticker.name}`} 
                            className="sticker-item" 
                        />
                        <p>{sticker.name}</p>
                        <p className="rarity-label">{sticker.rarity?.toUpperCase() || 'COMMON'}</p>
                    </div>
                )) : <p>Você ainda não possui stickers.</p>}
            </div>

            {/* Pagination */}
            {stickers.length > 0 && (
                <nav aria-label="Page navigation" className="pagination-container">
                    <ul className="pagination">
                        {/* Left arrow */}
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            >
                                <span className="seta-esquerda" aria-hidden="true">◂</span>
                            </button>
                        </li>

                        {/* Number 1 */}
                        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(1)}
                            >
                                1
                            </button>
                        </li>

                        {/* Ellipsis before middle numbers */}
                        {currentPage > 3 && totalPages > 5 && (
                            <li className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        )}

                        {/* Middle numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page =>
                                page !== 1 &&
                                page !== totalPages &&
                                (totalPages <= 5 ||
                                    (page >= currentPage - 1 && page <= currentPage + 1))
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

                        {/* Ellipsis after middle numbers */}
                        {currentPage < totalPages - 2 && totalPages > 5 && (
                            <li className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        )}

                        {/* Last number */}
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

                        {/* Right arrow */}
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
            )}
        </div>
        </>
    );
};