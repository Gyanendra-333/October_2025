import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.middleware.js";
import { User } from "../models/user.model.js";

export const isAuthenticate = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res
            .status(400)
            .json({ success: false, message: "UnAutherised" })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
        return res
            .status(400)
            .json({ success: false, message: "UnAutherised" })
    }
    const user = await User.findById(decode.id);
    req.user = user;
    next();

});