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
const CitaEsquema_1 = __importDefault(require("../esquema/CitaEsquema"));
class CitaDAO {
    // Crear cita
    // ************************************************************************************
    static crearCita(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosUsuario;
            console.log(parametros);
            const objCita = new CitaEsquema_1.default(parametros);
            objCita.save((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al crear la cita" });
                }
                else {
                    res.status(200).json({ id: objeto._id });
                }
            });
        });
    }
    // ************************************************************************************
    // Obtener todas las citas con alguna información del médico y el paciente
    // ************************************************************************************
    static obtenerCitas(res) {
        return __awaiter(this, void 0, void 0, function* () {
            CitaEsquema_1.default.find().sort({ fechaCita: 1 })
                .populate({ path: "codMedico", select: "nombreUsuario correoUsuario" })
                .populate({ path: "codPaciente", select: "nombreUsuario correoUsuario" })
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
    // Obtener una cita con toda la información del médico y el paciente
    // ************************************************************************************
    static obtenerUnaCita(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonCItaID = { _id: identificador };
            CitaEsquema_1.default.findOne(jsonCItaID)
                .populate({ path: "codMedico", select: "nombreUsuario, correoUsuario" })
                .populate({ path: "codPaciente", select: "nombreUsuario, correoUsuario" })
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
    // Cantidad de citas x el id de un médico
    // ************************************************************************************
    static cantidadCitasMedico(idMedico, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(idMedico)) {
                const llave = { _id: idMedico };
                const cantidad = yield CitaEsquema_1.default.countDocuments({ codMedico: llave });
                res.status(200).json({ respuesta: cantidad });
            }
            else {
                res.status(400).json({ respuesta: "Identificador incorrecto" });
            }
        });
    }
    // ************************************************************************************
    // Obtener todas las citas con información del paciente para un médico específico
    // ************************************************************************************
    static obtenerCitasMedico(idMedico, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(idMedico)) {
                const llave = { _id: idMedico };
                CitaEsquema_1.default.find({ codMedico: llave }).sort({ _id: -1 })
                    .populate({ path: "codPaciente", select: "nombreUsuario, correoUsuario" })
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
    static eliminarCita(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield CitaEsquema_1.default.findById(identificador).exec();
            if (existe) {
                CitaEsquema_1.default.findByIdAndDelete(identificador, (miError, objeto) => {
                    // UsuarioEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                    if (miError) {
                        res.status(400).json({ respuesta: "Error al eliminar la cita" });
                    }
                    else {
                        res.status(200).json({ eliminado: objeto });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "La cita NO existe" });
            }
        });
    }
    // ************************************************************************************
    // actualizar usuario por _id
    // ************************************************************************************
    static actualizarCita(identificador, jsonExterno, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete jsonExterno._id;
            delete jsonExterno.datosUsuario;
            const existe = yield CitaEsquema_1.default.findById(identificador).exec();
            if (existe) {
                CitaEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: jsonExterno }, (miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error al actualizar la cita, verificar la información" });
                    }
                    else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "La cita NO existe" });
            }
        });
    }
}
exports.default = CitaDAO;
