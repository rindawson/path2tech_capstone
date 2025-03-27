import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose.connect('mongodb+srv://rindawson:UzQlHQ54mBhin7Cm@cluster0.qkklx.mongodb.net/foodapp').then(()=>console.log("DB Connected"))
}