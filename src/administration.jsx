import { useEffect, useState } from "react";

export const Administration = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                // Filtrar usuários apenas do departamento Marketing
                const itUsers = data.filter(user => user.department === "Administration");
                setUsers(itUsers);
            })
            .catch(error => console.error("Erro ao buscar usuários:", error));
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4">Usuários do Departamento de Administração</h2>
            {users.length === 0 ? (
                <p>Nenhum usuário encontrado no departamento de Administração.</p>
            ) : (
                <ul className="list-group mt-3">
                    {users.map(user => (
                        <li key={user.email} className="list-group-item">
                            <strong>Nome:</strong> {user.name} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Equipe:</strong> {user.team}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};