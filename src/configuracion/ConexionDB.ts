import { connect } from "mongoose";

const ConexionDB = () => {
    const urlConexion = String(process.env.DB_MONGO);
    connect(urlConexion)
        .then(con => {
            console.log('conexion establecida con la base: ', process.env.DB_MONGO);
        })
        .catch(miError => {
            console.log(miError);
        });
};

export default ConexionDB;

