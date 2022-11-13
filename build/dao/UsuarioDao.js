"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PerfilEsquema_1 = __importDefault(require("../esquema/PerfilEsquema"));
const UsuarioEsquema_1 = __importDefault(require("../esquema/UsuarioEsquema"));
class UsuarioDAO {
    // Iniciar sesión
    // ************************************************************************************
    static iniciarSesion(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const miClave = parametros.claveUsuario;
            const miCorreo = parametros.correoUsuario;
            UsuarioEsquema_1.default.findOne({ correoUsuario: miCorreo }).populate({ path: "codPerfil", select: "nombrePerfil" })
                .exec((miError, objeto) => {
                if (objeto) {
                    const claveCorrecta = bcryptjs_1.default.compareSync(miClave, objeto.claveUsuario);
                    if (claveCorrecta) {
                        const datosVisibles = {
                            codUsuario: objeto._id,
                            correo: miCorreo,
                            perfil: objeto.codPerfil.nombrePerfil
                        };
                        const llavePrivada = String(process.env.SECRETA);
                        const miToken = jsonwebtoken_1.default.sign(datosVisibles, llavePrivada, { expiresIn: 86400 });
                        res.status(200).json({
                            tokenMintic: miToken,
                            avatarMintic: objeto.avatarUsuario
                        });
                    }
                    else {
                        res.status(400).json({ respuesta: "Credenciales incorrectas" });
                    }
                }
                else {
                    res.status(400).json({ respuesta: "Credenciales incorrectas" });
                }
            });
        });
    }
    // ************************************************************************************
    // Creación de un usuario con un perfil indicado por referencia
    // ************************************************************************************
    static crearUsuario(correo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validación existencia perfil
            // **************************************
            const nombrePerfilPorDefecto = String(process.env.PERFIL_USUARIO_EXTERNO);
            const jsonPerfil = { nombrePerfil: nombrePerfilPorDefecto };
            const existePerfil = yield PerfilEsquema_1.default.findOne(jsonPerfil).exec();
            if (existePerfil) {
                parametros.codPerfil = existePerfil._id;
            }
            else {
                const objPerfil = new PerfilEsquema_1.default(jsonPerfil);
                objPerfil.save();
                parametros.codPerfil = objPerfil._id;
            }
            // **************************************
            const existe = yield UsuarioEsquema_1.default.findOne(correo).exec();
            if (existe) {
                res.status(400).json({ respuesta: "El correo ya existe" });
            }
            else {
                parametros.claveUsuario = bcryptjs_1.default.hashSync(parametros.claveUsuario, 10);
                const objUsuario = new UsuarioEsquema_1.default(parametros);
                objUsuario.save((miError, objeto) => {
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al crear el usuario' });
                    }
                    else {
                        const datosVisibles = {
                            codUsuario: objeto._id,
                            correo: parametros.correoUsuario,
                            perfil: nombrePerfilPorDefecto
                        };
                        const llavePrivada = String(process.env.SECRETA);
                        const miToken = jsonwebtoken_1.default.sign(datosVisibles, llavePrivada, { expiresIn: 86400 });
                        res.status(200).json({
                            tokenMintic: miToken,
                            avatarMintic: objeto.avatarUsuario
                        });
                    }
                });
            }
        });
    }
}
exports.default = UsuarioDAO;
