import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterDriver.css'; 

const RegisterDriver: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [vehicle, setVehicle] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [ratePerKm, setRatePerKm] = useState<number>(0);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleRegisterDriver = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/driver', {
                name,
                description,
                vehicle,
                rating,
                rate_per_km: ratePerKm,
            });
            if (response.data.message) {
                alert('Motorista cadastrado com sucesso!');
                setName('');
                setDescription('');
                setVehicle('');
                setRating(0);
                setRatePerKm(0);
                navigate('/');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.error || 'Erro ao cadastrar motorista.');
            } else {
                setError('Erro inesperado.');
            }
        }
    };

    return (
        <div className="register-driver">
            <h2>Cadastro de Motorista</h2>
            <form onSubmit={handleRegisterDriver}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Veículo:</label>
                    <input type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
                </div>
                <div>
                    <label>Avaliação (0 a 5):</label>
                    <input 
                        type="number" 
                        value={rating} 
                        onChange={(e) => setRating(Number(e.target.value))} 
                        min="0" 
                        max="5" 
                        required 
                    />
                </div>
                <div>
                    <label>Taxa por Km:</label>
                    <input 
                        type="number" 
                        value={ratePerKm} 
                        onChange={(e) => setRatePerKm(Number(e.target.value))} 
                        required 
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Cadastrar Motorista</button>
            </form>
        </div>
    );
};

export default RegisterDriver;