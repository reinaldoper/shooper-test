
export interface RideOption {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
      rating: number; 
  };
  value: number; 
}


export interface LocationState {
  rideOptions: {
      customer_id: string; 
      origin: { latitude: number; longitude: number }; 
      destination: { latitude: number; longitude: number }; 
      distance: number; 
      duration: string; 
      options: RideOption[]; 
  };
}