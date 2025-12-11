import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { User } from "../models/userModel.js";

export const register = CatchAsyncError(async (req, res, next) => {

    const { name, email, phone, password, verificationMethod } = req.body;

    if (!name || !email || !phone || !password) {
        return next(new errorMiddleware("All fields are required", 400));
    }

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
        return next(new errorMiddleware("Email already registered", 400));
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    const verificationCodeExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    const user = await User.create({
        name,
        email,
        phone,
        password,
        verificationCode,
        verificationCodeExpire,
        accountVerified: false,
    });

    // -------------------------------------
    // 4️⃣ Send Verification Method
    // -------------------------------------
    if (verificationMethod === "email") {
        // Yaha email sending ka function call hoga
        // sendEmailVerification(email, verificationCode);
    }

    res.status(201).json({
        success: true,
        message: "User registered successfully. Please verify your account.",
        verificationCode, // For testing purpose only. Production me remove kar dena.
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            accountVerified: user.accountVerified
        }
    });
});
