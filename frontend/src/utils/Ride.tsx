interface Ride {
  id: number;
  createdAt: string; 
  updatedAt: string;
  origin: string;
  destination: string; 
  distance: number; 
  duration: string; 
  value: number; 
  driver_id: number;
}

export default Ride;