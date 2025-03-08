import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import './shop.css';

export const Shop = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: '', credits: 0 });

    useEffect(() => {
        const fetchShop = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/shop', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar perfil');
                }

                const data = await response.json();
                setUserData({ name: data.message.split(', ')[1], credits: data.credits });
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        fetchShop();
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
            <h1>Hello {userData.name}, you have {userData.credits} credits</h1>
            <div className="full-width-bar"></div>
            <h2>Shop</h2>
            <div className="full-width-bar"></div>

        </div>
        </>
    )
}