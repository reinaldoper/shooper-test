import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <h1>App de Taxi</h1>
            <ul>
                <li>
                    <Link to="/">Login</Link>
                </li>
                <li>
                    <Link to="/register-driver">Motorista</Link>
                </li>
                <li>
                    <Link to="/request">Viajem</Link>
                </li>
                <li>
                    <Link to="/options">Opções de Viagem</Link>
                </li>
                <li>
                    <Link to="/history">Histórico de Viagens</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;