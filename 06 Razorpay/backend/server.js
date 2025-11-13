import express from "express";
import "dotenv/config";
import connectDb from "./database/db.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// middleware 
app.use(express.json());
app.use(cors({
    origin: process.env.FORNTEND_URL,
    Credential: true
}))

app.listen(PORT, async () => {
    await connectDb();
    console.log(`Server is Running at Port : ${PORT}`);
});


// route 
app.use("/api/v1/user", userRouter);
