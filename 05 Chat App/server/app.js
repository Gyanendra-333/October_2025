import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import express, { urlencoded } from "express";
import fileUpload from "express-fileupload";
import { dbConnect } from "./database/db.js";

// Route import 
import userRouter from "./routes/user.route.js";

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

dbConnect();

app.use("/api/v1/user", userRouter);

export default app;
