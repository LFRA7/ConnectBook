import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

export const Shop = () => {
    const [stickers, setStickers] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

      useEffect(() => {
        if (!isAuthenticated()) {
            console.log("Usuário não autenticado! Redirecionando...");
            navigate('/access-denied', { replace: true }); // Força a substituição da página
            return;
        }

        const token = localStorage.getItem('token');

        fetch('http://localhost:3000/shop', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Falha ao carregar os stickers');
            }
            return response.json();
        })
        .then((data) => setStickers(data))
        .catch((error) => console.error('Erro ao carregar os stickers:', error));
    }, [navigate]);

    return (
        <div className="shop-container">
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            <h1>Sticker Shop</h1>
            <div className="stickers-grid">
                {stickers.length > 0 ? (
                    stickers.map((sticker) => (
                        <div key={sticker.id} className="sticker-card">
                            <img src={sticker.url} alt={`Sticker ${sticker.id}`} />
                        </div>
                    ))
                ) : (
                    <p>Carregando stickers...</p>
                )}
            </div>
        </div>
    );
};
