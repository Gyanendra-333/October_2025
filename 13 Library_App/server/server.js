import { app } from "./app.js";
import { connectDB } from "./utils/db.js";



app.listen(process.env.PORT, () => {
    console.log(`Server is Running Port ${process.env.PORT}.`)
});
connectDB();