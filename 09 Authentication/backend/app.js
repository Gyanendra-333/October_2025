import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/error-middleware.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

config({ path: "./env" });
export const app = express();


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

// Routes 
app.use("/api/v1", userRouter);
