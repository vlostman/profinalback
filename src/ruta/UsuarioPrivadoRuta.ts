import { Router } from "express";
import usuarioPrivadoControlador from "../controlador/UsuarioPrivadoControlador";

class UsuarioPrivadoRuta {

    public rutaAPI: Router;

    constructor() {
        this.rutaAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAPI.post('/crear', usuarioPrivadoControlador.crear);

        this.rutaAPI.get('/todos', usuarioPrivadoControlador.consulta);
        this.rutaAPI.get('/uno/:codigo', usuarioPrivadoControlador.consultaUno);

        this.rutaAPI.get('/todos/:codPerfil', usuarioPrivadoControlador.consultaXPerfil);
        this.rutaAPI.get('/cantxperfil/:codPerfil', usuarioPrivadoControlador.cantidadEnPerfil);

        this.rutaAPI.delete('/eliminar/:codUsuario', usuarioPrivadoControlador.eliminar);
        this.rutaAPI.put('/actualizar/:codUsuario', usuarioPrivadoControlador.actualizar);
    }

};

const usuarioPrivadoRuta = new UsuarioPrivadoRuta();
export default usuarioPrivadoRuta.rutaAPI;
