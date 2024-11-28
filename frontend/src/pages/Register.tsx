import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css'; 

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://backend:8080/user/register', {
                name,
                email,
                password,
            });
            if (response.data.message) {
                alert(response.data.message);
                navigate('/');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.error || 'Erro ao cadastrar usuário.');
            } else {
                setError('Erro inesperado.');
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Registro de Usuário</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Cadastrar</button>
            </form>
            <p>
                Já tem uma conta? 
                <span 
                    style={{ cursor: 'pointer', color: '#007bff' }} 
                    onClick={() => navigate('/')}
                >
                    Faça login aqui.
                </span>
            </p>
            <p>
                Cadastrar motorista?? 
                <span 
                    style={{ cursor: 'pointer', color: '#007bff' }} 
                    onClick={() => navigate('/register-driver')}
                >
                    Cadastre aqui.
                </span>
            </p>
        </div>
    );
};

export default Register;