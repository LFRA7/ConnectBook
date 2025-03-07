import { NavLink } from 'react-router-dom';

export const AccessDenied = () => {
    return (
        <div className="access-denied-container">
            <h1>Acesso Negado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
            <NavLink to="/login" className="btn btn-primary">
                Fazer Login
            </NavLink>
        </div>
    );
};