import { initMongoose } from "../../../lib/mongoose";
import Cliente from "../../../models/Cliente";


export default async function handle(req,res){
    await initMongoose();
    res.json(await Cliente.find().exec());
}