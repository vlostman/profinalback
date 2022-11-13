"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CitaEntidad {
    constructor(codm, codp, lafe, esta) {
        this.codMedico = codm;
        this.codPaciente = codp;
        this.fechaCita = lafe;
        this.estadoCita = esta;
    }
}
;
exports.default = CitaEntidad;
