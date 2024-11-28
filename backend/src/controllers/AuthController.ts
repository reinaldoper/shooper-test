import { Request, Response } from 'express';
import User from '../models/User'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';


dotenv.config();

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret_token', { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login bem-sucedido!', token: user.id });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};