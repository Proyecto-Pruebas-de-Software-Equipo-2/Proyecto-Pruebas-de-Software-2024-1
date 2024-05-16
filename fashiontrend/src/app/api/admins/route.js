import { initMongoose } from "@lib/mongoose";
import { NextResponse } from "next/server";
import Admin from "@models/Admin";
import bcryptjs from "bcrypt";


export async function GET(){
    initMongoose();
    const admins = await Admin.find();
    return NextResponse.json(admins)
}
 
export async function POST(request) {
    initMongoose();
    try {
      const body = await request.json();
      const newAdmin = new Admin(body);

      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(newAdmin.password, salt)
      newAdmin.password = hashedPassword
      
      const savedAdmin = await newAdmin.save();

      return NextResponse.json(savedAdmin);
    } catch (error) {
      return NextResponse.json(error.message, {
        status: 400,
      });
    }
  }