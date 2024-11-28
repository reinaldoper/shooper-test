interface RideOption {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
      rating: number; 
  };
  value: number; 
}


export default RideOption;