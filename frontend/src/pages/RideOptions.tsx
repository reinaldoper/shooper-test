import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios';
import { LocationState } from '../utils/LocationState';


const RideOptions: React.FC = () => {
  const navigate = useNavigate();

  
  const rideOptions: LocationState['rideOptions'] = JSON.parse(localStorage.getItem('rideOptions') || '{}');

 
  if (!rideOptions || !rideOptions.customer_id) {
    return <div>Opções de viagem não disponíveis.</div>;
  }

  const handleConfirmRide = async (driverId: number) => {
    if (!rideOptions || !rideOptions.customer_id) {
      alert('Opções de viagem não disponíveis.');
      return;
    }

    try {
      const response = await axios.patch('http://localhost:8080/ride/confirm', {
        customer_id: rideOptions.customer_id,
        origin: rideOptions.origin,
        destination: rideOptions.destination,
        distance: rideOptions.distance,
        duration: rideOptions.duration,
        driver: { id: driverId },
        value: rideOptions.options.find(option => option.id === driverId)?.value,
      });

      if (response.data.success) {
        alert('Viagem confirmada com sucesso!');
        navigate('/history');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(`Erro: ${error.response.data.error_description}`);
        } else {
          alert('Verifique os dados e tente novamente.');
        }
      } else {
        alert('Erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="ride-options">
      <h1>Opções de Viagem</h1>
      <div>
        {rideOptions.options && rideOptions.options.length > 0 ? (
          rideOptions.options.map(option => (
            <div key={option.id} className="ride-option">
              <h2>{option.name}</h2>
              <p>{option.description}</p>
              <p>Veículo: {option.vehicle}</p>
              <p>Avaliação: {option.review.rating}</p>
              <p>Valor da Viagem: R$ {option.value.toFixed(2)}</p>
              <button onClick={() => handleConfirmRide(option.id)}>Escolher</button>
            </div>
          ))
        ) : (
          <p>Nenhuma opção disponível.</p>
        )}
      </div>
    </div>
  );
};

export default RideOptions;