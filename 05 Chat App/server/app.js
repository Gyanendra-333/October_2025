import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import express, { urlencoded } from "express";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./config/.env" });

app.use(cors({
    origin: process.env.FRONTEND_URL,
    Credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/"
}));

export default app;