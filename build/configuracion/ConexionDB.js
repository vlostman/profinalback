"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConexionDB = () => {
    const urlConexion = String(process.env.DB_MONGO);
    (0, mongoose_1.connect)(urlConexion)
        .then(con => {
        console.log('conexion establecida con la base: ', process.env.DB_MONGO);
    })
        .catch(miError => {
        console.log(miError);
    });
};
exports.default = ConexionDB;
