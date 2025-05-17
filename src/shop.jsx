import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react';
import './shop.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Shop = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: '', credits: 0 });
    const [selectedPack, setSelectedPack] = useState(null);
    const [newStickers, setNewStickers] = useState([]);
    const [repeatedStickers, setRepeatedStickers] = useState([]);
    const [showStickerModal, setShowStickerModal] = useState(false);
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

                if (!response.ok) throw new Error('Error searching for profile');

                const data = await response.json();
                setUserData({ name: data.message.split(', ')[1], credits: data.credits });
            } catch (error) {
                toast.error(error);
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
        { name: "Premium Pack", price: 75, stickers: 12, image: "/src/assets/Premium Pack.png" },
    ];

    const handlePurchase = (pack) => {
        setSelectedPack(pack);
    };

    const confirmPurchase = async () => {
        if (!selectedPack) return;

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to purchase a pack.");
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
                setUserData(prev => ({ ...prev, credits: data.credits }));
                setNewStickers(data.newStickers || []);
                setRepeatedStickers(data.repeatedStickers || []);
                setShowStickerModal(true);
                toast.success(`Purchase completed successfully! You opened ${selectedPack.name} and spent ${selectedPack.price} credits.`);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error("Error processing purchase:", error);
        }

        setSelectedPack(null);
    };

    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
              />
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
                        <div key={index} className="pack-container" onClick={() => handlePurchase(pack)}>
                            <img src={pack.image} alt={pack.name} className="packs-item" />
                            <span className="price-tag">{pack.price}</span>
                        </div>
                    ))}
                </div>

                {selectedPack && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Are you sure you want to buy {selectedPack.name} and receive {selectedPack.stickers} stickers?</p>
                            <button onClick={confirmPurchase} className="confirm-button">Yes</button>
                            <button onClick={() => setSelectedPack(null)} className="cancel-button">No</button>
                        </div>
                    </div>
                )}

                {showStickerModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Purchase Result</h2>
                            <div className="sticker-columns">
                                <div className="sticker-section">
                                    <h3>New Stickers</h3>
                                    {newStickers.length === 0 ? (
                                        <p>You haven't received any new stickers.</p>
                                    ) : (
                                        <div className="sticker-grid">
                                            {newStickers.map((sticker, index) => (
                                                <div key={index} className={`sticker-box border-${sticker.rarity || 'common'}`}>
                                                    <img
                                                        src={`/stickers/${sticker.sticker}`}
                                                        alt={`Sticker de ${sticker.name}`}
                                                        className="sticker-item"
                                                    />
                                                    <p>{sticker.name}</p>
                                                    <p className="rarity-label">{sticker.rarity?.toUpperCase() || 'COMMON'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="sticker-section">
                                    <h3>Repeated Stickers</h3>
                                    {repeatedStickers.length === 0 ? (
                                        <p>No repeated stickers.</p>
                                    ) : (
                                        <div className="sticker-grid">
                                            {repeatedStickers.map((sticker, index) => (
                                                <div key={index} className={`sticker-box border-${sticker.rarity || 'common'}`}>
                                                    <img
                                                        src={`/stickers/${sticker.sticker}`}
                                                        alt={`Sticker de ${sticker.name}`}
                                                        className="sticker-item"
                                                    />
                                                    <p>{sticker.name}</p>
                                                    <p className="rarity-label">{sticker.rarity?.toUpperCase() || 'COMMON'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {repeatedStickers.length > 0 && (
                                        <p className="extra-credits">Credits received: +{repeatedStickers.reduce((total, sticker) => {
                                            switch (sticker.rarity) {
                                                case 'common': return total + 5;
                                                case 'rare': return total + 10;
                                                case 'epic': return total + 15;
                                                case 'legendary': return total + 20;
                                                default: return total;
                                            }
                                        }, 0)}</p>
                                    )}
                                </div>
                            </div>
                            <button onClick={() => setShowStickerModal(false)} className="confirm-button">Close</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};