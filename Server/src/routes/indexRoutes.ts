import { Router } from "express";
import { indexController } from "../controllers/indexControllers";


class IndexRoutes{
public router : Router = Router();
    constructor(){
        this.Config();
    }
Config() : void{
    this.router.get('/',indexController.index);
}
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
