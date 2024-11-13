import { Request, Response } from "express"
import postModel from "../models/postModel";
import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from 'dotenv';

interface createPost {
    name: string,
    prompt: string,
    photo: any,

}
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//get all post
export const getAllPostController = async (req:Request,res: Response) => {
    try {
        const posts = await postModel.find({});
        // console.log("hi", posts)
        res.status(200).json({
            success: true,
            message:'Got All Post',
            posts,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error while getting all post",
            error,
        })
    }
}

// create a post
export const createPostController = async (req:Request, res:Response) => {
    try {
       
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

        const {name, prompt, photo} : createPost = req.body;
        const photoURL = await cloudinary.uploader.upload(photo);

        const newPost = await postModel.create({
            name,
            prompt,
            photo:photoURL.url,
        });
        console.log(newPost)

        res.status(201).json({
            success:true,
            message:'Product created successfully',
            data:newPost,
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error while creating post',
            error
        })
    }
}