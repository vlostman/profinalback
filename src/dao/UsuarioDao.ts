import { Types } from "mongoose";
import { Response } from 'express';

import cifrar from "bcryptjs";
import jwt from "jsonwebtoken";
import PerfilEsquema from "../esquema/PerfilEsquema";
import UsuarioEsquema from "../esquema/UsuarioEsquema";

class UsuarioDAO {

    // Iniciar sesión
    // ************************************************************************************
    protected static async iniciarSesion(parametros: any, res: Response): Promise<any> {
        const miClave = parametros.claveUsuario;
        const miCorreo = parametros.correoUsuario;
        UsuarioEsquema.findOne({ correoUsuario: miCorreo }).populate({ path: "codPerfil", select: "nombrePerfil" })
            .exec((miError, objeto) => {
                if (objeto) {
                    const claveCorrecta = cifrar.compareSync(miClave, objeto.claveUsuario);
                    if (claveCorrecta) {
                        const datosVisibles: any = {
                            codUsuario: objeto._id,
                            correo: miCorreo,
                            perfil: objeto.codPerfil.nombrePerfil
                        };
                        const llavePrivada = String(process.env.SECRETA);
                        const miToken = jwt.sign(datosVisibles, llavePrivada, { expiresIn: 86400 });
                        res.status(200).json({
                            tokenMintic: miToken,
                            avatarMintic: objeto.avatarUsuario
                        });
                    } else {
                        res.status(400).json({ respuesta: "Credenciales incorrectas" });
                    }
                } else {
                    res.status(400).json({ respuesta: "Credenciales incorrectas" });
                }
            });
    }
    // ************************************************************************************
    

    // Creación de un usuario con un perfil indicado por referencia
    // ************************************************************************************
    protected static async crearUsuario(correo: any, parametros: any, res: Response): Promise<any> {
        // Validación existencia perfil
        // **************************************
        const nombrePerfilPorDefecto = String(process.env.PERFIL_USUARIO_EXTERNO);
        const jsonPerfil = { nombrePerfil: nombrePerfilPorDefecto };
        const existePerfil = await PerfilEsquema.findOne(jsonPerfil).exec();
        if (existePerfil) {
            parametros.codPerfil = existePerfil._id;
        } else {
            const objPerfil = new PerfilEsquema(jsonPerfil);
            objPerfil.save();
            parametros.codPerfil = objPerfil._id;
        }
        // **************************************
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
                    const datosVisibles: any = {
                        codUsuario: objeto._id,
                        correo: parametros.correoUsuario,
                        perfil: nombrePerfilPorDefecto
                    };
                    const llavePrivada = String(process.env.SECRETA);
                    const miToken = jwt.sign(datosVisibles, llavePrivada, { expiresIn: 86400 });
                    res.status(200).json({
                        tokenMintic: miToken,
                        avatarMintic: objeto.avatarUsuario
                    });
                }
            });
        }
    }
    // ************************************************************************************

}

export default UsuarioDAO;