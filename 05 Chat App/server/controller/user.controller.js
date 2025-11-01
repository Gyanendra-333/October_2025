import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js"
import { User } from "../models/user.model.js";
import { generateJWTToken } from "../utils/jwtToken.js";

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

export const signin = catchAsyncError(async (req, res, next) => { });

export const signout = catchAsyncError(async (req, res, next) => { });

export const getUser = catchAsyncError(async (req, res, next) => { });

export const updateProfile = catchAsyncError(async (req, res, next) => { });
