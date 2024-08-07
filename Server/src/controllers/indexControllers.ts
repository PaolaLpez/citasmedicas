import { Request, Response } from "express";
import pool from "../database";
class IndexController{
    public async index(req : Request, resp : Response){
        const games = await pool.query('SELECT* FROM games');
        resp.json(games);
   }
}
export const indexController = new IndexController();