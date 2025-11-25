import { app } from "./app.js";
import { dbConnect } from "./utils/dbConnect.js";


app.listen(process.env.PORT, () => {
    console.log(`✅ Server is Running Port : ${process.env.PORT}.`)
});

dbConnect();
