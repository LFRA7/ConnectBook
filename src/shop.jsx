import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react';
import './shop.css';

export const Shop = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: '', credits: 0 });
    const [selectedPack, setSelectedPack] = useState(null);
    const [userStickers, setUserStickers] = useState([]);
    const [showStickerModal, setShowStickerModal] = useState(false); //Controlo do pop up
    const [isOpen, setOpen] = useState(false);

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
                    throw new Error('Erro ao procurar perfil');
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

    const packs = [
        { name: "Basic Pack", price: 15, stickers: 2, image: "/src/assets/Basic Pack.png" },
        { name: "Elite Pack", price: 35, stickers: 5, image: "/src/assets/Elite Pack.png" },
        { name: "Premium Pack", price: 75, stickers: 14, image: "/src/assets/Premium Pack.png" },
    ];
      
    // Função chamada ao clicar na imagem ou preço do pack
    const handlePurchase = (pack) => {
        setSelectedPack(pack);
    };
      
    // Função chamada quando o usuário confirma a compra
    const confirmPurchase = async () => {
        if (!selectedPack) return;
    
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Você precisa estar logado para comprar um pack.");
            navigate("/login");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/buy-pack", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    packPrice: selectedPack.price, 
                    stickerCount: selectedPack.stickers 
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                let message = (`Você comprou o ${selectedPack.name} e recebeu ${selectedPack.stickers} stickers!`);
                if (data.extraCredits > 0) {
                    message += `\nVocê recebeu ${data.extraCredits} créditos extras por stickers repetidos!`;
                }

                alert(message);
                setUserData((prev) => ({ ...prev, credits: data.credits })); // Atualiza os créditos
                setUserStickers(data.stickers); // Atualiza os stickers recebidos
                setShowStickerModal(true); // Exibe o popup com os stickers
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Erro ao processar a compra:", error);
        }
    
        setSelectedPack(null); // Fecha o model
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
                        <NavLink to="/shop" className="btn btn-primary btn-lg">Shop </NavLink>
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
            <div className="title-shop">
            <h1>Hello {userData.name}, you have {userData.credits} credits</h1>
            </div>
            <div className="full-width-bar"></div>
            <div className="title-shop-h2">
            <h2>Shop</h2>
            </div>
            <div className="full-width-bar"></div>
            <div className="packs">
                {packs.map((pack, index) => (
                <div key={index} className="pack-container">
                <img 
                  src={pack.image} 
                  alt={pack.name} 
                  className="packs-item" 
                  onClick={() => handlePurchase(pack)} 
                  style={{ cursor: "pointer" }}
                />
                <span 
                  className="price-tag" 
                  onClick={() => handlePurchase(pack)} 
                  style={{ cursor: "pointer" }}
                >
                  {pack.price}
                </span>
              </div>
                ))}
      {selectedPack && (
        <div className="modal">
          <div className="modal-content">
            <p>Tem a certeza que quer comprar o {selectedPack.name} e receber {selectedPack.stickers} stickers?</p>
            <button onClick={confirmPurchase} className="confirm-button">Sim</button>
            <button onClick={() => setSelectedPack(null)} className="cancel-button">Não</button>
          </div>
        </div>
      )}

      {/* Modal de Stickers após a compra */}
      {showStickerModal && (
    <div className="modal">
        <div className="modal-content">
            <h2>Stickers Comprados!</h2>
            <div className="stickers-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {userStickers.map((sticker, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <img 
                            src={`/stickers/${sticker.sticker}`} 
                            alt={`Sticker de ${sticker.name}`} 
                            className="sticker-item" 
                            style={{ width: '100px', height: '100px', objectFit: 'contain' }} 
                        />
                        <p>{sticker.name}</p> {/* Nome do dono do sticker */}
                    </div>
                ))}
            </div>
            <button onClick={() => setShowStickerModal(false)} className="confirm-button">Fechar</button>
        </div>
    </div>
)}
        </div>
        </div>
        </>
    )
}