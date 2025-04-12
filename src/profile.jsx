import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import './profile.css';

export const Profile = () => {
    const navigate = useNavigate();
    const [stickers, setStickers] = useState([]);
    const [userData, setUserData] = useState({ name: '', stickersCount: 0 });

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
            <div className="stickers-container">
                {stickers.length > 0 ? stickers.map((sticker, index) => (
                    <div key={index}>
                        <img 
                            src={`/stickers/${sticker.sticker}`} 
                            alt={`Sticker de ${sticker.name}`} 
                            className="sticker-image" 
                        />
                        <p>{sticker.name}</p>
                    </div>
                )) : <p>Você ainda não possui stickers.</p>}
            </div>
        </div>
        </>
    );
};