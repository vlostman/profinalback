import { Request, Response } from 'express';
import UsuarioPrivadoDAO from '../dao/UsuarioPrivadoDAO';


class UsuarioPrivadoControlador extends UsuarioPrivadoDAO {

    public crear(req: Request, res: Response): void {
        const correo = { correoUsuario: req.body.correoUsuario };
        UsuarioPrivadoControlador.crearUsuario(correo, req.body, res);
    }

    public consulta(req: Request, res: Response): void {
        UsuarioPrivadoControlador.obtenerUsuarios(res);
    }

    public consultaUno(req: Request, res: Response): void {
        UsuarioPrivadoControlador.obtenerUnUsuario(req.params.codigo, res);
    }

    public eliminar(req: Request, res: Response): void {
        UsuarioPrivadoControlador.eliminarUsuario(req.params.codUsuario, res);
    }

    public actualizar(req: Request, res: Response): void {
        UsuarioPrivadoControlador.actualizarUsuario(req.params.codUsuario, req.body, res);
    }

    public cantidadEnPerfil(req: Request, res: Response): void {
        UsuarioPrivadoControlador.cantidadUsuariosEnPerfil(req.params.codPerfil, res);
    }

    public consultaXPerfil(req: Request, res: Response): void {
        UsuarioPrivadoControlador.obtenerUsuariosPerfil(req.params.codPerfil, res);
    }

};

const usuarioPrivadoControlador = new UsuarioPrivadoControlador();
export default usuarioPrivadoControlador;