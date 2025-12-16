import { app } from "./app.js";
import dotnev from "dotenv";

dotnev.config();


app.listen(3000, () => {
    console.log(`Server is Running Port ${process.env.PORT || 4000}.`)
});
