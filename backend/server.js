import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json({limit: '1gb'}))
app.use(express.urlencoded({ extended: true, limit: '1gb' }));
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/images",express.static('uploads'))
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/",(req,res)=>{
   res.send("API Working")
})

app.listen(port, ()=>{
   console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://rindawson:57821@cluster0.qkklx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0