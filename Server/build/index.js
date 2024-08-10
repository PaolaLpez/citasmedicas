"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const citaRoutes_1 = __importDefault(require("./routes/citaRoutes"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const pacienteRoutes_1 = __importDefault(require("./routes/pacienteRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
<<<<<<< HEAD
        this.app.use('/api/cita', citaRoutes_1.default);
=======
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/citas', citaRoutes_1.default);
        this.app.use('/api/paciente', pacienteRoutes_1.default);
>>>>>>> origin/Cristian13
    }
    start() {
        this.app.listen(3000, () => {
            console.log('Server on port 3000');
        });
    }
}
const server = new Server();
server.start();
