import { Schema, model, Types } from "mongoose";
import UsuarioEntidad from "../entidades/UsuarioEntidad";

const UsuarioEsquema = new Schema<UsuarioEntidad>({
    nombreUsuario: { type: String, required: true, trim: true },
    correoUsuario: { type: String, unique: true, required: true, lowercase: true },
    claveUsuario: { type: String, required: true },
    fechaRegistroUsuario: { type: Date, default: Date.now() },
    estadoUsuario: { type: Number, enum: [1, 2], default: 1 },
    nombreImagenUsuario: { type: String, default: "noAvatar.png" },
    avatarUsuario: { type: String, default: "noAvatar" },
    codPerfil: { type: Types.ObjectId, ref: "Perfil", required: true },

}, { versionKey: false });

export default model("Usuario", UsuarioEsquema, "Usuario");

