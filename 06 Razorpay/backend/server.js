import express from "express";
import "dotenv/config";
import connectDb from "./database/db.js";
import userRouter from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middleware 
app.use(express.json());

app.listen(PORT, async () => {
    await connectDb();
    console.log(`Server is Running at Port : ${PORT}`);
});


// route 
app.use("/api/v1/user", userRouter);