import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import './profile.css';

export const Profile = () => {
    const navigate = useNavigate();
    const [stickers, setStickers] = useState([]);

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
            })
            .catch(error => console.error('Erro ao buscar stickers:', error));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return(
        <>
        <div className="app-container">
            <header className="header">
                <nav className="nav">
                    <div className="nav-left">
                        <button type="button" className="btn btn-light">ConnectBook</button>
                    </div>
                    <div className="nav-right">
                        <NavLink to="/" className="btn btn-primary btn-lg">Home</NavLink>
                        <NavLink to="/profile" className="btn btn-primary btn-lg">Profile</NavLink>
                        <NavLink to="/shop" className="btn btn-primary btn-lg">Shop</NavLink>
                        <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
                    </div>
                </nav>
            </header>
            <h1>Hello User</h1>
            <div className="full-width-bar"></div>
            <h2>Seus Stickers</h2>
            <div className="full-width-bar"></div>
            <div className="stickers-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '20px' }}>
                {stickers.length > 0 ? stickers.map((sticker, index) => (
                    <img key={index} src={sticker} alt={`Sticker ${index}`} className="sticker-image" style={{ maxWidth: '150px', maxHeight: '150px' }} />
                )) : <p>Você ainda não possui stickers.</p>}
            </div>
        </div>
        </>
    );
};

