const { Schema, model, models} = require("mongoose");

const AdminSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
})


const Admin = model("Admin", AdminSchema, "Administrador");
export default Admin;