class PerfilEntidad {

    public nombrePerfil: string;
    public estadoPerfil: number;

    constructor(nom: string, est: number) {
        this.nombrePerfil = nom;
        this.estadoPerfil = est;
    }

};

export default PerfilEntidad;