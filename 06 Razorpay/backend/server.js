import express from "express";
import "dotenv/config";
import connectDb from "./database/db.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
    await connectDb();
    console.log(`Server is Running at Port : ${PORT}`);
});

