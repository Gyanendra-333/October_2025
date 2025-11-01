import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "ChatApp" });
        console.log("Database Connected Successfully.");
    } catch (error) {
        console.error(`Database Error: ${error.message || error}`);
    }
};
