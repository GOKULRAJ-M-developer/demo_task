import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log("successfully connected to db");
    } catch (error) {
        console.log("error has occured", error.message);
        process.exit(1);
    }
};

export default connectdb;