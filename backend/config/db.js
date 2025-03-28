import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_DB = process.env.MONGO_DB;

export const connectDB = async () => {
   await mongoose.connect(MONGO_DB).then(()=>console.log("DB Connected"))
}