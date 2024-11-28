import { Request, Response } from 'express';
import Driver from '../models/Driver'; 

export const registerDriver = async (req: Request, res: Response): Promise<Response> => {
    const { name, description, vehicle, rating, rate_per_km } = req.body;

    if (!name || !description || !vehicle || rating === undefined || rate_per_km === undefined) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const driver = await Driver.create({ name, description, vehicle, rating, rate_per_km });

        return res.status(201).json({ message: 'Motorista cadastrado com sucesso!', driverId: driver.id });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao cadastrar motorista.' });
    }
};