import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;

        if (!MONGODB_URI) {
            console.log("❌ MONGODB_URI is not defined in .env");
            return;
        }

        await mongoose.connect(MONGODB_URI, {
            dbName: "TODO_APP",
        });

        console.log("✅ Database Connected Successfully.");
    } catch (error) {
        console.log("❌ Database Connection Error:", error);
    }
};
