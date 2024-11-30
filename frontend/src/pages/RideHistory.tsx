import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import axios from 'axios';
import Ride from '../utils/Ride';

const RideHistory: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  

  const fetchRides = async () => {
    const customerId = JSON.parse(localStorage.getItem('token') || '{}');

    try {
      const response = await axios.get(`http://localhost:8080/ride/${customerId}`);
      setRides(response.data.rides);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(`Erro: ${error.response.data.error_description}`);
        } else {
          alert('Erro ao atualizar a página.');
        }
      } else {
        alert('Erro inesperado. Tente novamente mais tarde.');
      }
    }
  };


  useEffect(() => {
    fetchRides();
  }, []);

  const formatDateToBrazilian = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <div className="ride-history">
      <h1>Histórico de Viagens</h1>

      {rides.length > 0 ? (
        rides.map((ride) => (
          <div key={ride.id} className="ride">
            <p>Data e Hora: {formatDateToBrazilian(new Date(ride.createdAt))}</p>
            <p>Distância: {ride.distance} km</p>
            <p>Duração: {ride.duration}</p>
            <p>Valor: R$ {ride.value.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma viagem encontrada.</p>
      )}
    </div>
  );
};

export default RideHistory;