import { useEffect, useState } from "react";

export const HumanResources = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(data => {
                // Filtrar Colaboradores apenas do departamento Marketing
                const itUsers = data.filter(user => user.department === "Human Resources");
                setUsers(itUsers);
            })
            .catch(error => console.error("Erro ao procurar Colaboradores:", error));
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4">Colaboradores do Departamento de Recursos Humanos</h2>
            {users.length === 0 ? (
                <p>Nenhum Colaborador encontrado no departamento de Recursos Humanos.</p>
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