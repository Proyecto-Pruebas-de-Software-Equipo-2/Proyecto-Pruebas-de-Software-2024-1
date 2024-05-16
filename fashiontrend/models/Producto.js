const { Schema, model, models} = require("mongoose");
const ProductoSchema = new Schema({
    nombre: String,
    precio: Number,
    talla: String,
    descripcion: String,
    color: String,
    categoria: String,
    tipo: String,
    stock: Number,
})

const Producto = models?.Producto || model("Producto",ProductoSchema);
export default Producto;