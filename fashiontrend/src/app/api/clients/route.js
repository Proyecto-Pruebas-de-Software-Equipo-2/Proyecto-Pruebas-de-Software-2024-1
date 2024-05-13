import { initMongoose } from "@lib/mongoose";
import { NextResponse } from "next/server";
import Cliente from "@models/Cliente";
import bcryptjs from "bcrypt";



export async function GET(){
    initMongoose();
    const clients = await Cliente.find();
    return NextResponse.json(clients)
}

export async function POST(request) {
    try {
      const body = await request.json();
      const newCliente = new Cliente(body);
      //const salt = await bcryptjs.genSalt(10)
      //const hashedPassword = await bcryptjs.hash(newCliente.password, salt)
      //newCliente.password = hashedPassword
      const savedCliente = await newCliente.save();

      console.log("Cliente guardado:", savedCliente);
      return NextResponse.json(savedCliente);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }