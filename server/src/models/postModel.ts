import mongoose from "mongoose";

interface post {
    name: string,
    prompt: string,
    photo: string,
}
const postSchema = new mongoose.Schema<post>({
    name:{
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    photo:{
        type: String,
        required: true,
    }
})

export default mongoose.model<post>('Post', postSchema);