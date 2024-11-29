import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../styles/RequestRide.css'; 

const RequestRide: React.FC = () => {
    const [originPosition, setOriginPosition] = useState<{ lat: number; lng: number } | null>(null); 
    const [destinationPosition, setDestinationPosition] = useState<{ lat: number; lng: number } | null>(null); 
    const navigate = useNavigate();

    const handleEstimate = async () => {
        const customerId = JSON.parse(localStorage.getItem('token') || '{}'); 

        if (!originPosition || !destinationPosition) {
            alert('Por favor, defina tanto a origem quanto o destino.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/ride/estimate', {
                customer_id: customerId,
                origin: `${originPosition.lat},${originPosition.lng}`, 
                destination: `${destinationPosition.lat},${destinationPosition.lng}`,
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
            const newLatLng = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };

            if (!originPosition) { 
                setOriginPosition(newLatLng);
            } else if (!destinationPosition) { 
                setDestinationPosition(newLatLng);
            }
        }
    };

    return (
        <div className="request-ride">
            <h1>Solicitação de Viagem</h1>
            <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_API_KEY || ''}>
                <GoogleMap
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    center={originPosition || { lat: -23.5505, lng: -46.6333 }} 
                    zoom={12}
                    onClick={handleMapClick} 
                >
                    {originPosition && <Marker position={originPosition} />}
                    {destinationPosition && <Marker position={destinationPosition} />}
                </GoogleMap>
            </LoadScript>
            <input 
                type="text" 
                placeholder="Endereço de Origem" 
                value={originPosition ? `Lat: ${originPosition.lat}, Lng: ${originPosition.lng}` : ''} 
                readOnly 
            />
            <input 
                type="text" 
                placeholder="Endereço de Destino" 
                value={destinationPosition ? `Lat: ${destinationPosition.lat}, Lng: ${destinationPosition.lng}` : ''} 
                readOnly 
            />
            <button onClick={handleEstimate}>Estimar Valor</button>
        </div>
    );
};

export default RequestRide;