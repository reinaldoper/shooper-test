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

export const getDrivers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const drivers = await Driver.findAll(); 
        return res.status(200).json(drivers);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar motoristas.' });
    }
};

export const getDriveById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const driver = await Driver.findByPk(id);

        if (!driver) {
            return res.status(404).json({ error: 'Motorista não encontrado.' });
        }

        return res.status(200).json({ driver: driver });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar motorista.' });
    }
};