const { Schema, model, models} = require("mongoose");
const ClienteSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    direccion: String,
    telefono: Number
})

const Cliente = models?.Cliente || model("Cliente",ClienteSchema);
export default Cliente;