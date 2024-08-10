import { Request, Response } from 'express';

class IndexController{
    public index(req : Request, resp : Response){
        resp.json('Hola usuario');
   }

}
export const indexController = new IndexController();
