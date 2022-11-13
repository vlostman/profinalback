import PerfilDAO from '../dao/PerfilDAO';
import { Request, Response } from 'express';

class PerfilControlador extends PerfilDAO {

    public consulta(req: Request, res: Response): void {
        PerfilControlador.obtenerPerfiles(res);
    }

    public crear(req: Request, res: Response): void {
        PerfilControlador.crearPerfil(req.body, res);
    }

    public eliminar(req: Request, res: Response): void {
        PerfilControlador.eliminarPerfil(req.params.codigo, res);
    }

    public actualizar(req: Request, res: Response): void {
        PerfilControlador.actualizarPerfil(req.params.codigo, req.body, res);
    }

    public consultaUno(req: Request, res: Response): void {
        PerfilControlador.obtenerUnPerfil(req.params.codigo, res);
    }

};

const perfilControlador = new PerfilControlador();
export default perfilControlador;