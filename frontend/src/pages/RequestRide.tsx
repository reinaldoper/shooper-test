import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './styles/RequestRide.css'; 

const RequestRide: React.FC = () => {
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [originPosition, setOriginPosition] = useState<{ lat: number; lng: number }>({ lat: -23.5505, lng: -46.6333 }); // Posição inicial (São Paulo)
    const [destinationPosition, setDestinationPosition] = useState<{ lat: number; lng: number }>({ lat: -23.5505, lng: -46.6333 }); // Posição inicial (São Paulo)
    const navigate = useNavigate();

    const handleEstimate = async () => {
        const customerId = JSON.parse(localStorage.getItem('token') || '{}'); 

        try {
            const response = await axios.post('http://backend:8080/ride/estimate', {
                customer_id: customerId,
                origin,
                destination,
            });

            const { origin: originData, destination: destinationData, distance, duration, options } = response.data;
            localStorage.setItem('rideOptions', JSON.stringify({
              options,
              distance,
              duration,
              origin: originData,
              destination: destinationData,
              customer_id: customerId 
            }));
            navigate('/options');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    alert(`Erro: ${error.response.data.error_description}`);
                } else {
                    alert('Erro ao estimar a viagem. Verifique os dados e tente novamente.');
                }
            } else {
                alert('Erro inesperado. Tente novamente mais tarde.');
            }
        }
    };

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            
            if (!origin) {
                
                setOriginPosition({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                });
                setOrigin(`Lat: ${event.latLng.lat()}, Lng: ${event.latLng.lng()}`); 
            } else if (!destination) {
                
                setDestinationPosition({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                });
                setDestination(`Lat: ${event.latLng.lat()}, Lng: ${event.latLng.lng()}`); 
            }
        }
    };

    return (
        <div className="request-ride">
            <h1>Solicitação de Viagem</h1>
            <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_API_KEY || ''}>
                <GoogleMap
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    center={originPosition}
                    zoom={12}
                    onClick={handleMapClick} 
                >
                    <Marker position={originPosition} />
                    <Marker position={destinationPosition} />
                </GoogleMap>
            </LoadScript>
            <input 
                type="text" 
                placeholder="Endereço de Origem" 
                value={origin} 
                readOnly 
            />
            <input 
                type="text" 
                placeholder="Endereço de Destino" 
                value={destination} 
                readOnly 
            />
            <button onClick={handleEstimate}>Estimar Valor</button>
        </div>
    );
};

export default RequestRide;