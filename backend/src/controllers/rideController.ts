import { Request, Response } from 'express';
import axios from 'axios';
import Driver from '../models/Driver';
import Ride from '../models/Ride';
import User from '../models/User';
import dotenv from 'dotenv';


dotenv.config();

export const estimateRide = async (req: Request, res: Response): Promise<Response> => {
  const { customer_id, origin, destination } = req.body;

  if (!customer_id || !origin || !destination || origin === destination) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Dados inválidos." });
  }

  try {
    const user = await User.findByPk(customer_id);
    if (!user) {
      return res.status(404).json({ error_code: "USER_NOT_FOUND", error_description: "Usuário não encontrado." });
    }
    const googleMapsResponse = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`);

    const routeData = googleMapsResponse.data.routes[0];

    if (!routeData) {
      return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Rota não encontrada." });
    }

    const distance = routeData.legs[0].distance.value / 1000;
    const duration = routeData.legs[0].duration.text;


    const drivers = await Driver.findAll();

    const options = drivers.map(driver => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: { rating: driver.rating, comment: "" },
      value: driver.rate_per_km * distance,
    })).sort((a, b) => a.value - b.value);

    return res.status(200).json({
      origin: { latitude: routeData.legs[0].start_location.lat, longitude: routeData.legs[0].start_location.lng },
      destination: { latitude: routeData.legs[0].end_location.lat, longitude: routeData.legs[0].end_location.lng },
      distance,
      duration,
      options,
      routeResponse: routeData,
    });

  } catch (error) {
    return res.status(500).json({ error_code: "SERVER_ERROR", error_description: "Internal server error" });
  }
};

export const confirmRide = async (req: Request, res: Response): Promise<Response> => {
  const { customer_id, origin, destination, distance, duration, driver_id, value } = req.body;

  if (!customer_id || !origin || !destination || origin === destination || !driver_id || distance <= 0) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Dados inválidos." });
  }

  const user = await User.findByPk(customer_id);
  if (!user) {
    return res.status(404).json({ error_code: "USER_NOT_FOUND", error_description: "Usuário não encontrado." });
  }

  const driverExists = await Driver.findByPk(driver_id);

  if (!driverExists) {
    return res.status(404).json({ error_code: "DRIVER_NOT_FOUND", error_description: "Motorista não encontrado." });
  }


  await Ride.create({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver_id,
    value
  });

  return res.status(200).json({ success: true });
};

export const getRides = async (req: Request, res: Response): Promise<Response> => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  if (!customer_id) {
    return res.status(400).json({ error_code: "INVALID_DRIVER", error_description: "ID do cliente é obrigatório." });
  }

  let rides: string | any[];
  if (driver_id) {
    rides = await Ride.findAll({ where: { customer_id, driver_id }, order: [['createdAt', 'DESC']] });
  } else {
    rides = await Ride.findAll({ where: { customer_id }, order: [['createdAt', 'DESC']] });
  }

  if (!rides.length) {
    return res.status(404).json({ error_code: "NO_RIDES_FOUND", error_description: "Nenhum registro encontrado." });
  }

  return res.status(200).json({ customer_id, rides: rides });
};