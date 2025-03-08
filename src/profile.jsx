import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import './profile.css';

export const Profile = () => {
    const navigate = useNavigate();
    const [userStickers, setUserStickers] = useState([]); // Estado para armazenar os stickers do usuário

    useEffect(() => {
        const fetchUserStickers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/user-stickers', { // Ajuste para o endpoint correto
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar stickers do usuário');
                }

                const data = await response.json();
                setUserStickers(data.stickers); // Define os stickers do usuário
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserStickers();
    }, [navigate]);

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
                        <NavLink to="/shop" className="btn btn-primary btn-lg">Shop </NavLink>
                        <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
                    </div>
                </nav>
            </header>
            <h1>Hello User</h1>
            <div className="full-width-bar"></div>
            <h2>Seus Stickers</h2>
            <div className="full-width-bar"></div>
          
            </div>
        </>
    );
};
