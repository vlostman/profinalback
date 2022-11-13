import PerfilEntidad from "./PerfilEntidad";

class UsuarioEntidad {

    public nombreUsuario: string;
    public correoUsuario: string;
    public claveUsuario: string;
    public fechaRegistroUsuario: Date;
    public estadoUsuario: number;
    public nombreImagenUsuario: string;
    public avatarUsuario: string;
    public codPerfil: PerfilEntidad

    constructor(nom: string, cor: string, cla: string, fec: Date, est: number, nomava: string, ava: string, cod: PerfilEntidad) {
        this.nombreUsuario = nom;
        this.correoUsuario = cor;
        this.claveUsuario = cla;
        this.fechaRegistroUsuario = fec;
        this.estadoUsuario = est;
        this.nombreImagenUsuario = nomava;
        this.avatarUsuario = ava;
        this.codPerfil = cod;
    }

};

export default UsuarioEntidad;
