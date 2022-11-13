"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CitaDAO_1 = __importDefault(require("../dao/CitaDAO"));
class CitaControlador extends CitaDAO_1.default {
    crear(req, res) {
        CitaControlador.crearCita(req.body, res);
    }
    consultarCitas(req, res) {
        CitaControlador.obtenerCitas(res);
    }
    consultaUna(req, res) {
        CitaControlador.obtenerUnaCita(req.params.codigo, res);
    }
    cantidadCitasMedico(req, res) {
        CitaControlador.cantidadCitasMedico(req.params.codigo, res);
    }
    consultarCitasMedico(req, res) {
        CitaControlador.obtenerCitasMedico(req.params.codigo, res);
    }
    eliminar(req, res) {
        CitaControlador.eliminarCita(req.params.codigo, res);
    }
    actualizar(req, res) {
        CitaControlador.actualizarCita(req.params.codigo, req.body, res);
    }
}
const citaControlador = new CitaControlador();
exports.default = citaControlador;
