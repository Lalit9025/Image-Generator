import mongoose from "mongoose";

const connectDB = async () => {
    try {
        //checking if MONGO_URL is undefined
        mongoose.set("strictQuery", true);

        if(!process.env.MONGO_URL){
            throw new Error('MONGO_URL environment variable is not defined');
        }
        const conn = await mongoose.connect(process.env.MONGO_URL as string);
        console.log(`connected to MongoDB database ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Error in connecting database : ${error}`)
    }
}

export default connectDB;