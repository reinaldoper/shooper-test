import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import axios from 'axios';
import Ride from '../utils/Ride';
import Driver from '../utils/Driver';

const RideHistory: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');

  const fetchRides = async (driverId?: string) => {
    const customerId = JSON.parse(localStorage.getItem('token') || '{}');

    try {

      const response = await axios.get(`http://backend:8080/ride/${customerId}`, {
        params: { driver_id: driverId }
      });
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

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`http://backend:8080/drivers`);
      setDrivers(response.data);
    } catch (error) {
      console.error('Erro ao buscar motoristas:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    fetchRides(selectedDriverId);
  }, [selectedDriverId]);

  return (
    <div className="ride-history">
      <h1>Histórico de Viagens</h1>

      <label htmlFor="driver-select">Selecione um Motorista:</label>
      <select
        id="driver-select"
        value={selectedDriverId}
        onChange={(e) => setSelectedDriverId(e.target.value)}
      >
        <option value="">-- Selecione um Motorista --</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {driver.name}
          </option>
        ))}
      </select>

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