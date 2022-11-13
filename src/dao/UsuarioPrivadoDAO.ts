import { Types } from "mongoose";
import { Response } from 'express';

import cifrar from "bcryptjs";
import UsuarioEsquema from "../esquema/UsuarioEsquema";

class UsuarioPrivadoDAO {

    // Crear un usuario
    // ************************************************************************************
    protected static async crearUsuario(correo: any, parametros: any, res: Response): Promise<any> {
        const nom = parametros.nombreImagenUsuario;
        delete parametros._id;
        delete parametros.datosUsuario;
        parametros.nombreImagenUsuario = nom.substring(nom.lastIndexOf("\\") + 1);
        const existe = await UsuarioEsquema.findOne(correo).exec();
        if (existe) {
            res.status(400).json({ respuesta: "El correo ya existe" });
        } else {
            parametros.claveUsuario = cifrar.hashSync(parametros.claveUsuario, 10);
            const objUsuario = new UsuarioEsquema(parametros);
            objUsuario.save((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: 'Error al crear el usuario' });
                } else {
                    res.status(200).json({ id: objeto._id });
                }
            });
        }
    }
    // ************************************************************************************


    // Obtener todos los usuarios con toda la información del perfil incluída
    // ************************************************************************************
    protected static async obtenerUsuarios(res: Response): Promise<any> {
        UsuarioEsquema.find().sort({ _id: -1 }).populate("codPerfil")
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Obtener un solo usuario con toda la información del perfil incluída
    // ************************************************************************************
    protected static async obtenerUnUsuario(identificador: any, res: Response): Promise<any> {
        const jsonUsuarioID = { _id: identificador };
        UsuarioEsquema.findOne(jsonUsuarioID) .populate("codPerfil")
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Cantidad de usuarios x perfil dado
    // ************************************************************************************
    protected static async cantidadUsuariosEnPerfil(identificadorPerfil: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificadorPerfil)) {
            const llave = { _id: identificadorPerfil };
            const cantidad = await UsuarioEsquema.countDocuments({ codPerfil: llave });
            res.status(200).json({ respuesta: cantidad });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Obtener todos los usuarios con un perfil entregado
    // ************************************************************************************
    protected static async obtenerUsuariosPerfil(identificador: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificador)) {
            const llave = { _id: identificador };
            UsuarioEsquema.find({ codPerfil: llave }).sort({ _id: -1 })
                .populate({ path: "codPerfil", select: "nombrePerfil" })
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
    protected static async eliminarUsuario(identificador: any, res: Response): Promise<any> {
        const existe = await UsuarioEsquema.findById(identificador).exec();
        if (existe) {
            UsuarioEsquema.findByIdAndDelete(identificador, (miError: any, objeto: any) => {
                // UsuarioEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al eliminar el Usuario" });
                } else {
                    res.status(200).json({ eliminado: objeto });
                }
            });
        } else {
            res.status(400).json({ respuesta: "El usuario NO existe" });
        }
    }
    // ************************************************************************************


    // actualizar usuario por _id
    // ************************************************************************************
    protected static async actualizarUsuario(identificador: string, jsonExterno: any, res: Response): Promise<any> {
        delete jsonExterno._id;
        delete jsonExterno.datosUsuario;
        delete jsonExterno.claveUsuario;
        delete jsonExterno.fechaRegistroUsuario;

        const nom = jsonExterno.nombreImagenUsuario;
        jsonExterno.nombreImagenUsuario = nom.substring(nom.lastIndexOf("\\") + 1);
        
        const existe = await UsuarioEsquema.findById(identificador).exec();
        if (existe) {
            UsuarioEsquema.findByIdAndUpdate(
                { _id: identificador },
                { $set: jsonExterno },
                (miError: any, objeto: any) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: 'Error al actualizar el usuario, puede que el correo esté repetido' });
                    } else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
        } else {
            res.status(400).json({ respuesta: "El usuario NO existe" });
        }
    }
    // ************************************************************************************

}

export default UsuarioPrivadoDAO;