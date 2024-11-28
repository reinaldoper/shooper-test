import React, { useState, useEffect } from 'react';
import '../styles/styles.css'
import axios from 'axios';
import Ride from '../utils/Ride';

const RideHistory: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);

  const fetchRides = async () => {
    const customerId = JSON.parse(localStorage.getItem('token') || '{}');

    try {
      const response = await axios.get(`http://backend:8080/ride/${customerId}`);
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
    };
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div className="ride-history">
      <h1>Histórico de Viagens</h1>

      {rides.length > 0 ? (
        rides.map((ride) => (
          <div key={ride.id} className="ride">
            <p>Data e Hora: {new Date(ride.date).toLocaleString()}</p>
            <p>Motorista: {ride.driver.name}</p>
            <p>Origem: {ride.origin}</p>
            <p>Destino: {ride.destination}</p>
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