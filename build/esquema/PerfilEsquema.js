"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PerfilEsquema = new mongoose_1.Schema({
    nombrePerfil: { type: String, required: true, unique: true, trim: true },
    estadoPerfil: { type: Number, enum: [1, 2], default: 1 }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("Perfil", PerfilEsquema, "Perfil");
