import { useEffect, useState } from 'react';

export const Shop = () => {
    const [stickers, setStickers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/shop')
            .then((response) => response.json())
            .then((data) => setStickers(data))
            .catch((error) => console.error('Erro ao carregar os stickers:', error));
    }, []);

    return (
        <div className="shop-container">
            <h1>Sticker Shop</h1>
            <div className="stickers-grid">
                {stickers.map((sticker) => (
                    <div key={sticker.id} className="sticker-card">
                        <img src={sticker.url} alt={`Sticker ${sticker.id}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};
