
import express from 'express'
import dotenv from 'dotenv'
 import cookieParser from 'cookie-parser'
import connectDB from './database/db.js'
import userRouter from './routes/user.route.js'
import cors from 'cors'
const app= express();
dotenv.config({})
//  call database connection here
connectDB()

const  PORT=process.env.PORT || 8000

//  default middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"],
    // methods: ["GET", "POST", "PUT", "DELETE"]
    // other options here if needed  (e.g., options: { 'Access-Control-Allow-Credentials': true })  for more details, refer to https://expressjs.com/en/api.html#app.use
}))
//  api
app.use('/api/v1/user',userRouter)

app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`);
    
})
