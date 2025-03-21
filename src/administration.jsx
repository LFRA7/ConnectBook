import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; 
import './administration.css';

export const Administration = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                // Filtrar Colaboradores apenas do departamento Administration
                const itUsers = data.filter(user => user.department === "Administration");
                setUsers(itUsers);
            })
            .catch(error => console.error("Erro ao procurar Colaboradores:", error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

    return (
        <>
        <div className="container">
            <header className="header">
            <nav className="nav">
                    <div className="nav-left">
                        <button type="button" className="btn btn-light">ConnectBook</button>
                    </div>
                    <div className="nav-right">
                        <NavLink to="/" className="btn btn-primary btn-lg">Home</NavLink>
                        <NavLink to="/departments" className="btn btn-primary btn-lg">Departments</NavLink>
                        <NavLink to="/profile" className="btn btn-primary btn-lg">Profile</NavLink>
                        <NavLink to="/shop" className="btn btn-primary btn-lg">Shop </NavLink>
                        <button onClick={handleLogout} className="btn btn-primary btn-lg">Logout</button>
                    </div>
                    
                </nav>
            </header>
            <h2 className="mt-4">Colaboradores do Departamento de Administração</h2>
            {users.length === 0 ? (
                <p>Nenhum Colaborador encontrado no departamento de Administração.</p>
            ) : (
                <ul className="list-group mt-3">
                    {users.map(user => (
                        <li key={user.email} className="list-group-item">
                            <strong>Nome:</strong> {user.name} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Equipa:</strong> {user.team}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>
    );
};