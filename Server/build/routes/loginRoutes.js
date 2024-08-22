"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = require("express");
const loginControllers_1 = require("../controllers/loginControllers");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/login', loginControllers_1.loginController.login);
    }
}
exports.loginRoutes = new LoginRoutes().router;
exports.default = exports.loginRoutes;
