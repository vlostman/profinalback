"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioDao_1 = __importDefault(require("../dao/UsuarioDao"));
class UsuarioControlador extends UsuarioDao_1.default {
    crear(req, res) {
        const correo = { correoUsuario: req.body.correoUsuario };
        UsuarioControlador.crearUsuario(correo, req.body, res);
    }
    iniciar(req, res) {
        UsuarioControlador.iniciarSesion(req.body, res);
    }
}
;
const usuarioControlador = new UsuarioControlador();
exports.default = usuarioControlador;
