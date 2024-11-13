"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostController = exports.getAllPostController = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//get all post
const getAllPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.default.find({});
        console.log("hi", posts);
        res.status(200).json({
            success: true,
            message: 'Got All Post',
            posts,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error while getting all post",
            error,
        });
    }
});
exports.getAllPostController = getAllPostController;
// create a post
const createPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const { name, prompt, photo } = req.body;
        const photoURL = yield cloudinary_1.v2.uploader.upload(photo);
        const newPost = yield postModel_1.default.create({
            name,
            prompt,
            photo: photoURL.url,
        });
        console.log(newPost);
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: newPost,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while creating post',
            error
        });
    }
});
exports.createPostController = createPostController;
