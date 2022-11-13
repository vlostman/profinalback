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
const PerfilEsquema_1 = __importDefault(require("../esquema/PerfilEsquema"));
const UsuarioEsquema_1 = __importDefault(require("../esquema/UsuarioEsquema"));
class PerfilDAO {
    // Consultar los datos de un perfil por un código específico
    // ************************************************************************************
    static obtenerUnPerfil(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonPerfil = { _id: identificador };
            const existePerfil = yield PerfilEsquema_1.default.findOne(jsonPerfil).exec();
            if (existePerfil) {
                res.status(200).json(existePerfil);
            }
            else {
                res.status(400).json({ respuesta: "El perfil NO existe con ese identificador" });
            }
        });
    }
    // ************************************************************************************
    // Obtener perfiles con orden y contando la cantidas de usuario que tiene el perfil
    // ************************************************************************************
    static obtenerPerfiles(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield PerfilEsquema_1.default.aggregate([
                { $lookup: { from: "Usuario", localField: "_id", foreignField: "codPerfil", as: "cantUsuarios" } },
                { $addFields: { cantUsuarios: { $size: "$cantUsuarios" } } }
            ]).sort({ _id: 1 });
            res.status(200).json(datos);
        });
    }
    // ************************************************************************************
    // Crear perfil verificando su existencia
    // ************************************************************************************
    static crearPerfil(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosUsuario;
            console.log(parametros);
            const existe = yield PerfilEsquema_1.default.findOne(parametros);
            // const existe = await PerfilEsquema.findOne({ nombrePerfil: 
            // { $regex: parametros.nombrePerfil, $options: 'i' } });
            if (existe) {
                res.status(400).json({ respuesta: "El perfil ya existe" });
            }
            else {
                const objPerfil = new PerfilEsquema_1.default(parametros);
                objPerfil.save((miError, objeto) => {
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al crear el Perfil' });
                    }
                    else {
                        res.status(200).json({ id: objeto._id });
                    }
                });
            }
        });
    }
    // ************************************************************************************
    // Eliminar perfil por código, verificando antes que no tenga usuarios asociados
    // ************************************************************************************
    static eliminarPerfil(parametro, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const llave = { _id: parametro };
            const cantidad = yield UsuarioEsquema_1.default.countDocuments({ codPerfil: llave });
            if (cantidad > 0) {
                res.status(400).json({ respuesta: 'Error, el perfil tiene usuarios relacionados' });
            }
            else {
                const existe = yield PerfilEsquema_1.default.findById(parametro).exec();
                if (existe) {
                    PerfilEsquema_1.default.deleteOne({ _id: parametro }, (miError, objeto) => {
                        //PerfilEsquema.findByIdAndDelete(parametro, (miError: any, objeto: any) => {
                        if (miError) {
                            res.status(400).json({ respuesta: 'Error al eliminar el Perfil' });
                        }
                        else {
                            res.status(200).json({ eliminado: objeto });
                        }
                    });
                }
                else {
                    res.status(400).json({ respuesta: "El perfil NO existe" });
                }
            }
        });
    }
    // ************************************************************************************
    // Actualizar perfil por código y con body JSON
    // ************************************************************************************
    static actualizarPerfil(codigo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosUsuario;
            const existe = yield PerfilEsquema_1.default.findById(codigo).exec();
            if (existe) {
                PerfilEsquema_1.default.findByIdAndUpdate({ _id: codigo }, { $set: parametros }, (miError, objeto) => {
                    console.log(miError);
                    console.log(objeto);
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al actualizar el Perfil' });
                    }
                    else {
                        res.status(200).json({ antiguo: objeto, nuevo: parametros });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "El perfil NO existe" });
            }
        });
    }
}
;
exports.default = PerfilDAO;
