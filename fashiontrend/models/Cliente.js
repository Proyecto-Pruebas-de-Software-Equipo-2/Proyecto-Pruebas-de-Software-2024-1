const { Schema, model, models} = require("mongoose");

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
    telefono: Number,
    favoritos: [String]
})


const Cliente = models?.Cliente || model("Cliente",ClienteSchema);
export default Cliente;