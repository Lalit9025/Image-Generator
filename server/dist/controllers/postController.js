"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//get all post
const getAllPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get all post");
    try {
        const posts = yield postModel_1.default.find({});
        // console.log("hi", posts)
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
    console.log("create post");
    try {
        const { name, prompt, photo } = req.body;
        console.log(name, prompt, photo);
        if (!name || !prompt || !photo) {
            return res.status(400).json({
                success: false,
                message: 'Name, prompt and photo are required'
            });
        }
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
//# sourceMappingURL=postController.js.map