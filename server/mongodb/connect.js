import mongoose from "mongoose";

const connectDB = async (url) => {
    mongoose.set("strictQuery", true);

    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}

export default connectDB;