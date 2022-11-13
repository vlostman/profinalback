"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioControlador_1 = __importDefault(require("../controlador/UsuarioControlador"));
class UsuarioRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.post('/crear', UsuarioControlador_1.default.crear);
        this.rutaAPI.post('/iniciar', UsuarioControlador_1.default.iniciar);
    }
}
;
const usuarioRuta = new UsuarioRuta();
exports.default = usuarioRuta.rutaAPI;
