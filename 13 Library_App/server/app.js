import express from "express"
import dotnev from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import errorMiddleware from "./middleware/error.middleware.js";
import userRoute from "./routes/user.route.js";

dotnev.config();
export const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use("/api/v1/user", userRoute);


app.use(errorMiddleware);
