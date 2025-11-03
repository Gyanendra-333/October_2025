import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js"
import { User } from "../models/user.model.js";
import { generateJWTToken } from "../utils/jwtToken.js";
import bcrypt from "bcryptjs";

// Register
export const signup = catchAsyncError(async (req, res, next) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill required field."
        });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please fill required formate."
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password atleast 6 character."
        });
    }

    const isEmailAlready = await User.findOne({ email });
    if (isEmailAlready) {
        return res.status(400).json({
            success: false,
            message: "User already register."
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        fullName,
        email,
        password: hashPassword,
        avatar: {
            public_id: "",
            url: "",
        }
    });

    generateJWTToken(user, "User Registered Successfully", 201, res);

});

// Login 
export const signin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(400).json({
            success: false,
            message: "Please Fill required fields"
        })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please fill required formate."
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "user not found"
        });
    }

    const isPasswordMatched = await bcrypt.compare(password, user?.password);
    if (!isPasswordMatched) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        });
    }

    generateJWTToken(user, "User Login Successfully", 200, res);

});

// Logout 
export const signout = catchAsyncError(async (_, res, next) => {
    res.status(200)
        .cookie("token", "", {
            httpOnly: true,
            maxAge: 0,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development" ? true : false
        })
        .json({
            success: true,
            message: "Logout Successfully",
        })
});


export const getUser = catchAsyncError(async (req, res, next) => { });

export const updateProfile = catchAsyncError(async (req, res, next) => { });
