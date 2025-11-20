import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}

// Prevent multiple connections in dev mode (Next.js hot reload)
let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI);

        isConnected = !!db.connections[0].readyState;

        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
        throw error;
    }
};
