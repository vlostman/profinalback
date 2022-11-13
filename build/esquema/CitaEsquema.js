"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CitaEsquema = new mongoose_1.Schema({
    codMedico: { type: mongoose_1.Types.ObjectId, ref: "Usuario", required: true },
    codPaciente: { type: mongoose_1.Types.ObjectId, ref: "Usuario", required: true },
    fechaCita: { type: Date, default: Date.now() },
    estadoCita: { type: Number, enum: [1, 2, 3, 4], default: 1 }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("Cita", CitaEsquema, "Cita");
