"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CitaControlador_1 = __importDefault(require("../controlador/CitaControlador"));
class CitaRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.post("/crear", CitaControlador_1.default.crear);
        this.rutaAPI.get("/todos", CitaControlador_1.default.consultarCitas);
        this.rutaAPI.get("/una/:codigo", CitaControlador_1.default.consultaUna);
        this.rutaAPI.get("/cantcitamed/:codigo", CitaControlador_1.default.cantidadCitasMedico);
        this.rutaAPI.get("/citasmed/:codigo", CitaControlador_1.default.consultarCitasMedico);
        this.rutaAPI.delete("/eliminar/:codigo", CitaControlador_1.default.eliminar);
        this.rutaAPI.put("/actualizar/:codigo", CitaControlador_1.default.actualizar);
    }
}
const citaRuta = new CitaRuta();
exports.default = citaRuta.rutaAPI;
