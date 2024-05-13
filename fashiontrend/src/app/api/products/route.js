import { initMongoose } from "@lib/mongoose";
import { NextResponse } from "next/server";
import Producto from "@models/Producto";



export async function GET(){
    initMongoose();
    const products = await Producto.find();
    return NextResponse.json(products)
}

export async function POST(request) {
    try {
      const body = await request.json();
      const newProducto = new Producto(body);

      const savedProducto = await newProducto.save();

      console.log("Producto guardado:", savedProducto);
      return NextResponse.json(savedProducto);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }