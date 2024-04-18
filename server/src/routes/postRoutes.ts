import express, { Router } from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import { createPostController, getAllPostController } from '../controllers/postController';

dotenv.config();

const router = express.Router();

router.get('/', getAllPostController);
router.post('/', createPostController)

export default router;