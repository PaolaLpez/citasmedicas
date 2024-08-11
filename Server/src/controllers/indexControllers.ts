import { Request, Response } from "express";
import pool from "../database";

class IndexController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const cita = await pool.query('SELECT * FROM cita');
            res.json(cita);
        } catch (error) {
            console.error('Error al obtener la cita:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    public hello(req: Request, res: Response): void {
        res.send('Hello');
    }
}

export const indexController = new IndexController();
