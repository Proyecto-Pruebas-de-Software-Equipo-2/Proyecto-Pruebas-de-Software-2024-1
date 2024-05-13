const { Schema, model, models} = require("mongoose");
import jwt from "jsonwebtoken";


const ClienteSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    direccion: {
        calle: String,
        ciudad: String,
        region: String,
        numero: Number,
        codigo: Number,
      },
    telefono: Number
})


const Cliente = models?.Cliente || model("Cliente",ClienteSchema);
export default Cliente;