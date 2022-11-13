import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import ConexionDB from "./ConexionDB";
import seguridad from "../middleware/Seguridad";

// Import de las rutas
import citaRuta from "../ruta/CitaRuta";
import perfilRuta from "../ruta/PerfilRuta";
import usuarioRuta from "../ruta/UsuarioRuta";
import usuarioPrivadoRuta from "../ruta/UsuarioPrivadoRuta";
// ****************************************************

class Servidor {
  public app: express.Application;

  constructor() {
    dotenv.config({ path: "variables.env" });
    ConexionDB();
    this.app = express();
    this.iniciarConfiguracion();
    this.activarRutas();
  }

  public iniciarConfiguracion(): void {
    this.app.set("PORT", process.env.PORT);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  public activarRutas(): void {
    // Parte pública
    this.app.use("/api/publica/usuario", usuarioRuta);

    // Parte privada
    this.app.use("/api/privada/perfil", seguridad.verificarToken, perfilRuta);
    this.app.use( "/api/privada/usuario", seguridad.verificarToken, usuarioPrivadoRuta );
    this.app.use("/api/privada/cita", seguridad.verificarToken, citaRuta);
  }

  public iniciarServidor(): void {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("servidor funcionando en el puerto: ", this.app.get("PORT"));
    });
  }
}

export default Servidor;
