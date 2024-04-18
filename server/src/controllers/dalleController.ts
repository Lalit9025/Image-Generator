import { Request, Response } from "express";
import OpenAIApi from "openai";

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
})
interface ImageGenerationRequest {
    prompt: string;
}
export const imageGenerateController = async (
    req : Request<ImageGenerationRequest>,
    res: Response) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            n:1,
            size: "1024x1024",
            response_format: "b64_json",
        });
        const image = aiResponse.data[0].b64_json;
        res.status(200).json({photo:image})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        })
    }
}