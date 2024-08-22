import { Router } from "express";
import { loginController } from "../controllers/loginControllers";

class LoginRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', loginController.login);
    }
}

export const loginRoutes = new LoginRoutes().router;
export default loginRoutes;

