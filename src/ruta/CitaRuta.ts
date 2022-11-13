import { Router } from "express";
import citaControlador from "../controlador/CitaControlador";

class CitaRuta {
  public rutaAPI: Router;

  constructor() {
    this.rutaAPI = Router();
    this.configuracion();
  }

  public configuracion(): void {
    this.rutaAPI.post("/crear", citaControlador.crear);
    this.rutaAPI.get("/todos", citaControlador.consultarCitas);
    this.rutaAPI.get("/una/:codigo", citaControlador.consultaUna);
    this.rutaAPI.get("/cantcitamed/:codigo", citaControlador.cantidadCitasMedico);
    this.rutaAPI.get("/citasmed/:codigo", citaControlador.consultarCitasMedico);

    this.rutaAPI.delete("/eliminar/:codigo", citaControlador.eliminar);
    this.rutaAPI.put("/actualizar/:codigo", citaControlador.actualizar);
  }
}

const citaRuta = new CitaRuta();
export default citaRuta.rutaAPI;
