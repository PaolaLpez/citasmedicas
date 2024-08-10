"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, resp) {
        resp.json('Hola usuario');
    }
}
exports.indexController = new IndexController();
