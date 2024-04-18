import express from "express";
import connectDB from "./config/connect";
import * as dotenv from 'dotenv';
import postRoutes from './routes/postRoutes';
import dalleRoutes from './routes/dalleRoutes'
import cors from 'cors';
dotenv.config();

//database connection
connectDB();


const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/post' ,postRoutes)
app.use('/api/v1/dalle',dalleRoutes)


const PORT = 8080 || process.env.PORT;

app.get("/", async(req,res)=>{
    res.send("Hello, How are you ?");
})

app.listen( PORT, () => {
    console.log(`server is running on PORT : ${PORT}`)
})