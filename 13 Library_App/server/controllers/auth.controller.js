import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";

// Register 
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

// Login 
export const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please provide email and password", 400));
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
        });
    } catch (error) {
        next(error);
        console.log("Error in login controller:", error);
    }
});

// Logout 
export const logout = asyncHandler(async (req, res, next) => {
    try {
        // For stateless JWT authentication, logout can be handled on the client side by deleting the token.
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        next(error);
        console.log("Error in logout controller:", error);
    }
});

// Forgot Password 
export const forgotPassword = asyncHandler(async (req, res, next) => {
    // Implementation for forgot password functionality
});

// Reset Password 
export const resetPassword = asyncHandler(async (req, res, next) => {
    // Implementation for reset password functionality
});