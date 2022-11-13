import UsuarioDao from '../dao/UsuarioDao';
import { Request, Response } from 'express';

class UsuarioControlador extends UsuarioDao {

    public crear(req: Request, res: Response): void {
        const correo = { correoUsuario: req.body.correoUsuario };
        UsuarioControlador.crearUsuario(correo, req.body, res);
    }

    public iniciar(req: Request, res: Response): void {
        UsuarioControlador.iniciarSesion(req.body, res);
    }

};

const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;