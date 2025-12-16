import { app } from "./app.js";
import dotnev from "dotenv";

dotnev.config();


app.listen(process.env.PORT, () => {
    console.log(`Server is Running Port ${process.env.PORT || 4000}.`)
});
