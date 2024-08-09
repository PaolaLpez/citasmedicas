import { Request, Response } from "express";
import pool from "../database";
class IndexController{
    public async index(req : Request, resp : Response){
        const citas = await pool.query('SELECT * FROM cita');
        resp.json(citas);
       
   }




}
export const indexController = new IndexController();