"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuarioEntidad {
    constructor(nom, cor, cla, fec, est, nomava, ava, cod) {
        this.nombreUsuario = nom;
        this.correoUsuario = cor;
        this.claveUsuario = cla;
        this.fechaRegistroUsuario = fec;
        this.estadoUsuario = est;
        this.nombreImagenUsuario = nomava;
        this.avatarUsuario = ava;
        this.codPerfil = cod;
    }
}
;
exports.default = UsuarioEntidad;
