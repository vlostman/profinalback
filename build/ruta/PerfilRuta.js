"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PerfilControlador_1 = __importDefault(require("../controlador/PerfilControlador"));
class PerfilRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.post('/crear', PerfilControlador_1.default.crear);
        this.rutaAPI.get('/todos', PerfilControlador_1.default.consulta);
        this.rutaAPI.get('/uno/:codigo', PerfilControlador_1.default.consultaUno);
        this.rutaAPI.delete('/eliminar/:codigo', PerfilControlador_1.default.eliminar);
        this.rutaAPI.put('/actualizar/:codigo', PerfilControlador_1.default.actualizar);
    }
}
;
const perfilRuta = new PerfilRuta();
exports.default = perfilRuta.rutaAPI;
