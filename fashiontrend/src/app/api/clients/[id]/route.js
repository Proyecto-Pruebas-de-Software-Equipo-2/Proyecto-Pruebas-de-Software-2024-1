import { initMongoose } from "@lib/mongoose";
import { NextResponse } from "next/server";
import Cliente from "@models/Cliente";

export async function GET(request, { params }) {
    initMongoose();
    try {
      const clienteFound = await Cliente.findById(params.id);
  
      if (!clienteFound)
        return NextResponse.json(
          {
            message: "Cliente not found",
          },
          {
            status: 404,
          }
        );
  
      return NextResponse.json(clienteFound);
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
      const clienteUpdated = await Cliente.findByIdAndUpdate(params.id, body, {
        new: true,
      });
  
      if (!clienteUpdated)
        return NextResponse.json(
          {
            message: "Cliente not found",
          },
          {
            status: 404,
          }
        );
  
      return NextResponse.json(clienteUpdated);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }
  
  export async function DELETE(request, { params }) {
    initMongoose();
  
    try {
      const clienteDeleted = await Cliente.findByIdAndDelete(params.id);
  
      if (!clienteDeleted)
        return NextResponse.json(
          {
            message: "Cliente not found",
          },
          {
            status: 404,
          }
        );
  
      return NextResponse.json(clienteDeleted);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }