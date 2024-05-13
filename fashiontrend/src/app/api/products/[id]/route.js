import { initMongoose } from "@lib/mongoose";
import { NextResponse } from "next/server";
import Producto from "@models/Producto";

export async function GET(request, { params }) {
    initMongoose();
    try {
      const productoFound = await Producto.findById(params.id);
  
      if (!productoFound)
        return NextResponse.json(
          {
            message: "Producto not found",
          },
          {
            status: 404,
          }
        );
  
      return NextResponse.json(productoFound);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }
  
  export async function PUT(request, { params }) {
    const body = await request.json();
    initMongoose();
  
    try {
      const productoUpdated = await Producto.findByIdAndUpdate(params.id, body, {
        new: true,
      });
  
      if (!productoUpdated)
        return NextResponse.json(
          {
            message: "Producto not found",
          },
          {
            status: 404,
          }
        );
  
      return NextResponse.json(productoUpdated);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }
  
  export async function DELETE(request, { params }) {
    initMongoose();
  
    try {
      const productoDeleted = await Producto.findByIdAndDelete(params.id);
  
      if (!productoDeleted)
        return NextResponse.json(
          {
            message: "Producto not found",
          },
          {
            status: 404,
          }
        );
  
      return NextResponse.json(productoDeleted);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }