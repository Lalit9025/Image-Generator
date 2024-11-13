import { Request, Response } from "express";
import axios from "axios";

interface ImageGenerationRequest {
    prompt: string;
}

export const imageGenerateController = async (
    req: Request<ImageGenerationRequest>,
    res: Response
) => {
    try {
        const { prompt } = req.body;
        
        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

        const aiResponse = await axios.get(apiUrl, { responseType: "arraybuffer" });
        const imageBuffer = Buffer.from(aiResponse.data, "binary").toString("base64");
    
        res.status(200).json({ photo: `data:image/jpeg;base64,${imageBuffer}` });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to generate image.",
        });
    }
};
