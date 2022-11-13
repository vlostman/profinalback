import { Types } from "mongoose";
import { Response } from 'express';
import CitaEsquema from "../esquema/CitaEsquema";

class CitaDAO {

    // Crear cita
    // ************************************************************************************
    protected static async crearCita(parametros: any, res: Response): Promise<any> {
        delete parametros._id;
        delete parametros.datosUsuario;
        console.log(parametros);
        const objCita = new CitaEsquema(parametros);
        objCita.save((miError, objeto) => {
            if (miError) {
                res.status(400).json({ respuesta: "Error al crear la cita" });
            } else {
                res.status(200).json({ id: objeto._id });
            }
        });
    }
    // ************************************************************************************


    // Obtener todas las citas con alguna información del médico y el paciente
    // ************************************************************************************
    protected static async obtenerCitas(res: Response): Promise<any> {
        CitaEsquema.find().sort({ fechaCita: 1 })
            .populate({ path: "codMedico", select: "nombreUsuario correoUsuario" })
            .populate({ path: "codPaciente", select: "nombreUsuario correoUsuario" })
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Obtener una cita con toda la información del médico y el paciente
    // ************************************************************************************
    protected static async obtenerUnaCita(identificador: any, res: Response): Promise<any> {
        const jsonCItaID = { _id: identificador };
        CitaEsquema.findOne(jsonCItaID)
            .populate({ path: "codMedico", select: "nombreUsuario, correoUsuario" })
            .populate({ path: "codPaciente", select: "nombreUsuario, correoUsuario" })
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Cantidad de citas x el id de un médico
    // ************************************************************************************
    protected static async cantidadCitasMedico(idMedico: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(idMedico)) {
            const llave = { _id: idMedico };
            const cantidad = await CitaEsquema.countDocuments({ codMedico: llave });
            res.status(200).json({ respuesta: cantidad });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Obtener todas las citas con información del paciente para un médico específico
    // ************************************************************************************
    protected static async obtenerCitasMedico(idMedico: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(idMedico)) {
            const llave = { _id: idMedico };
            CitaEsquema.find({ codMedico: llave }).sort({ _id: -1 })
                .populate({ path: "codPaciente", select: "nombreUsuario, correoUsuario" })
                .exec((miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error en la consulta" });
                    } else {
                        res.status(200).json(objeto);
                    }
                });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Eliminar usuario por identificador
    // ************************************************************************************
    protected static async eliminarCita(identificador: any, res: Response): Promise<any> {
        const existe = await CitaEsquema.findById(identificador).exec();
        if (existe) {
            CitaEsquema.findByIdAndDelete(identificador, (miError: any, objeto: any) => {
                // UsuarioEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al eliminar la cita" });
                } else {
                    res.status(200).json({ eliminado: objeto });
                }
            });
        } else {
            res.status(400).json({ respuesta: "La cita NO existe" });
        }
    }
    // ************************************************************************************


    // actualizar usuario por _id
    // ************************************************************************************
    protected static async actualizarCita(identificador: string, jsonExterno: any, res: Response): Promise<any> {
        delete jsonExterno._id;
        delete jsonExterno.datosUsuario;

        const existe = await CitaEsquema.findById(identificador).exec();
        if (existe) {
            CitaEsquema.findByIdAndUpdate(
                { _id: identificador },
                { $set: jsonExterno },
                (miError: any, objeto: any) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error al actualizar la cita, verificar la información" });
                    } else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
        } else {
            res.status(400).json({ respuesta: "La cita NO existe" });
        }
    }
    // ************************************************************************************

}

export default CitaDAO;