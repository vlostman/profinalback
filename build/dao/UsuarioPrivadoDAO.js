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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UsuarioEsquema_1 = __importDefault(require("../esquema/UsuarioEsquema"));
class UsuarioPrivadoDAO {
    // Crear un usuario
    // ************************************************************************************
    static crearUsuario(correo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nom = parametros.nombreImagenUsuario;
            delete parametros._id;
            delete parametros.datosUsuario;
            parametros.nombreImagenUsuario = nom.substring(nom.lastIndexOf("\\") + 1);
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
                        res.status(200).json({ id: objeto._id });
                    }
                });
            }
        });
    }
    // ************************************************************************************
    // Obtener todos los usuarios con toda la información del perfil incluída
    // ************************************************************************************
    static obtenerUsuarios(res) {
        return __awaiter(this, void 0, void 0, function* () {
            UsuarioEsquema_1.default.find().sort({ _id: -1 }).populate("codPerfil")
                .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                }
                else {
                    res.status(200).json(objeto);
                }
            });
        });
    }
    // ************************************************************************************
    // Obtener un solo usuario con toda la información del perfil incluída
    // ************************************************************************************
    static obtenerUnUsuario(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonUsuarioID = { _id: identificador };
            UsuarioEsquema_1.default.findOne(jsonUsuarioID).populate("codPerfil")
                .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                }
                else {
                    res.status(200).json(objeto);
                }
            });
        });
    }
    // ************************************************************************************
    // Cantidad de usuarios x perfil dado
    // ************************************************************************************
    static cantidadUsuariosEnPerfil(identificadorPerfil, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificadorPerfil)) {
                const llave = { _id: identificadorPerfil };
                const cantidad = yield UsuarioEsquema_1.default.countDocuments({ codPerfil: llave });
                res.status(200).json({ respuesta: cantidad });
            }
            else {
                res.status(400).json({ respuesta: "Identificador incorrecto" });
            }
        });
    }
    // ************************************************************************************
    // Obtener todos los usuarios con un perfil entregado
    // ************************************************************************************
    static obtenerUsuariosPerfil(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificador)) {
                const llave = { _id: identificador };
                UsuarioEsquema_1.default.find({ codPerfil: llave }).sort({ _id: -1 })
                    .populate({ path: "codPerfil", select: "nombrePerfil" })
                    .exec((miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error en la consulta" });
                    }
                    else {
                        res.status(200).json(objeto);
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "Identificador incorrecto" });
            }
        });
    }
    // ************************************************************************************
    // Eliminar usuario por identificador
    // ************************************************************************************
    static eliminarUsuario(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield UsuarioEsquema_1.default.findById(identificador).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndDelete(identificador, (miError, objeto) => {
                    // UsuarioEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                    if (miError) {
                        res.status(400).json({ respuesta: "Error al eliminar el Usuario" });
                    }
                    else {
                        res.status(200).json({ eliminado: objeto });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "El usuario NO existe" });
            }
        });
    }
    // ************************************************************************************
    // actualizar usuario por _id
    // ************************************************************************************
    static actualizarUsuario(identificador, jsonExterno, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete jsonExterno._id;
            delete jsonExterno.datosUsuario;
            delete jsonExterno.claveUsuario;
            delete jsonExterno.fechaRegistroUsuario;
            const nom = jsonExterno.nombreImagenUsuario;
            jsonExterno.nombreImagenUsuario = nom.substring(nom.lastIndexOf("\\") + 1);
            const existe = yield UsuarioEsquema_1.default.findById(identificador).exec();
            if (existe) {
                UsuarioEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: jsonExterno }, (miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: 'Error al actualizar el usuario, puede que el correo esté repetido' });
                    }
                    else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "El usuario NO existe" });
            }
        });
    }
}
exports.default = UsuarioPrivadoDAO;
