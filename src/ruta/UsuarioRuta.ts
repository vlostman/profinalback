import { Router } from "express";
import usuarioControlador from "../controlador/UsuarioControlador";

class UsuarioRuta {

    public rutaAPI: Router;

    constructor() {
        this.rutaAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAPI.post('/crear', usuarioControlador.crear);
        this.rutaAPI.post('/iniciar', usuarioControlador.iniciar);
    }

};

const usuarioRuta = new UsuarioRuta();
export default usuarioRuta.rutaAPI;

