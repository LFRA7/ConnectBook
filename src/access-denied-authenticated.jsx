import { NavLink } from 'react-router-dom';

export const AccessDeniedAuthenticated = () => {
    return (
        <div className="access-denied-container">
            <h1>Acesso Negado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
            <NavLink to="/" className="btn btn-primary">
                Home
            </NavLink>
        </div>
    );
};