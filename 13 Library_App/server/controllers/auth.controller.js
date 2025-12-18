import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";


export const register = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new ErrorHandler("Please provide all required fields", 400));
        }
        const isRegistered = await User.findOne({ email });
        if (isRegistered) {
            return next(new ErrorHandler("User already registered. Please login.", 409));
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });
        await user.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });


    } catch (error) {
        next(error);
        console.log("Error in register controller:", error);
    }
});