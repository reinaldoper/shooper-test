import { Request, Response } from 'express';
import User from '../models/User'; 
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já cadastrado.' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: user.id });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
};