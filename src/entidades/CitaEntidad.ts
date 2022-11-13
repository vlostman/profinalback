import UsuarioEntidad from "./UsuarioEntidad";

class CitaEntidad {

    public codMedico: UsuarioEntidad;
    public codPaciente: UsuarioEntidad;
    public fechaCita: Date;
    public estadoCita: number;


    constructor(codm: UsuarioEntidad, codp: UsuarioEntidad, lafe: Date, esta: number) {
        this.codMedico = codm;
        this.codPaciente = codp;
        this.fechaCita = lafe;
        this.estadoCita = esta;
    }

};

export default CitaEntidad;
