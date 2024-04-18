import express from "express";
import * as dotenv from 'dotenv';

import { imageGenerateController } from "../controllers/dalleController";

dotenv.config();

const router = express.Router();

router.get('/', (req: express.Request,res: express.Response)=>{
    res.send("hello from Lalit ")
});

router.post('/', imageGenerateController)

export default router;