// Definindo a interface para as opções de viagem
export interface RideOption {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
      rating: number; // Avaliação do motorista
  };
  value: number; // Valor da viagem
}

// Definindo a interface para o estado da localização
export interface LocationState {
  rideOptions: {
      customer_id: string; // ID do cliente
      origin: { latitude: number; longitude: number }; // Origem da viagem
      destination: { latitude: number; longitude: number }; // Destino da viagem
      distance: number; // Distância da viagem
      duration: string; // Duração da viagem
      options: RideOption[]; // Opções de viagem disponíveis
  };
}