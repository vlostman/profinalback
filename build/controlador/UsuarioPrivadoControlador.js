"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioPrivadoDAO_1 = __importDefault(require("../dao/UsuarioPrivadoDAO"));
class UsuarioPrivadoControlador extends UsuarioPrivadoDAO_1.default {
    crear(req, res) {
        const correo = { correoUsuario: req.body.correoUsuario };
        UsuarioPrivadoControlador.crearUsuario(correo, req.body, res);
    }
    consulta(req, res) {
        UsuarioPrivadoControlador.obtenerUsuarios(res);
    }
    consultaUno(req, res) {
        UsuarioPrivadoControlador.obtenerUnUsuario(req.params.codigo, res);
    }
    eliminar(req, res) {
        UsuarioPrivadoControlador.eliminarUsuario(req.params.codUsuario, res);
    }
    actualizar(req, res) {
        UsuarioPrivadoControlador.actualizarUsuario(req.params.codUsuario, req.body, res);
    }
    cantidadEnPerfil(req, res) {
        UsuarioPrivadoControlador.cantidadUsuariosEnPerfil(req.params.codPerfil, res);
    }
    consultaXPerfil(req, res) {
        UsuarioPrivadoControlador.obtenerUsuariosPerfil(req.params.codPerfil, res);
    }
}
;
const usuarioPrivadoControlador = new UsuarioPrivadoControlador();
exports.default = usuarioPrivadoControlador;
