import mongoose from "mongoose";

const connectDB = async (url) => {
    mongoose.set("strictQuery", true);

    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        console.log("\n🔧 To fix this issue:");
        console.log("1. Go to https://cloud.mongodb.com");
        console.log("2. Navigate to your project > Network Access");
        console.log("3. Add your current IP address (or 0.0.0.0/0 for all IPs)");
        console.log("4. Wait 1-2 minutes for the changes to take effect");
        console.log("5. Restart the server\n");
        // Don't throw error - let the app continue without DB
    }
}

export default connectDB;
