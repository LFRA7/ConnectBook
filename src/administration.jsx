import { useEffect, useState } from "react";

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

    return (
        <div className="container">
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
    );
};