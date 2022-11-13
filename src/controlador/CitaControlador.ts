import CitaDAO from "../dao/CitaDAO";
import { Request, Response } from "express";

class CitaControlador extends CitaDAO {
    
  public crear(req: Request, res: Response): void {
    CitaControlador.crearCita(req.body, res);
  }

  public consultarCitas(req: Request, res: Response): void {
    CitaControlador.obtenerCitas(res);
  }

  public consultaUna(req: Request, res: Response): void {
    CitaControlador.obtenerUnaCita(req.params.codigo, res);
  }

  public cantidadCitasMedico(req: Request, res: Response): void {
    CitaControlador.cantidadCitasMedico(req.params.codigo, res);
  }

  public consultarCitasMedico(req: Request, res: Response): void {
    CitaControlador.obtenerCitasMedico(req.params.codigo, res);
  }

  public eliminar(req: Request, res: Response): void {
    CitaControlador.eliminarCita(req.params.codigo, res);
  }

  public actualizar(req: Request, res: Response): void {
    CitaControlador.actualizarCita(req.params.codigo, req.body, res);
  }
}

const citaControlador = new CitaControlador();
export default citaControlador;
