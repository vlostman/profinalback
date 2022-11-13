import { Schema, model, Types } from "mongoose";
import CitaEntidad from "../entidades/CitaEntidad";

const CitaEsquema = new Schema<CitaEntidad>({
    codMedico: { type: Types.ObjectId, ref: "Usuario", required: true },
    codPaciente: { type: Types.ObjectId, ref: "Usuario", required: true },
    fechaCita: { type: Date, default: Date.now() },
    estadoCita: { type: Number, enum: [1, 2, 3, 4], default: 1 }
}, { versionKey: false });

export default model("Cita", CitaEsquema, "Cita");
