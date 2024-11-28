interface Ride {
  id: number;
  date: string; 
  driver: {
      name: string; 
  };
  origin: string;
  destination: string; 
  distance: number; 
  duration: string; 
  value: number; 
}

export default Ride;