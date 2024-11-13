import express from "express";
import connectDB from "./config/connect";
import * as dotenv from 'dotenv';
import postRoutes from './routes/postRoutes';
import dalleRoutes from './routes/dalleRoutes'
import cors from 'cors';
import bodyParser from 'body-parser'

dotenv.config();

//database connection
connectDB();


const app = express();

//middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/post' ,postRoutes)
app.use('/api/v1/dalle',dalleRoutes)

type Port = number;
const PORT : Port = 8080 || parseInt(process.env.PORT || '8080',10);

app.get("/", async(req : express.Request,res: express.Response)=>{
    res.send("Hello, How are you ?");
})

app.listen( PORT, () => {
    console.log(`server is running on PORT : ${PORT}`)
})