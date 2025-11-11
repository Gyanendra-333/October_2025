import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verfyEmail } from "../email/verifyEmail.js";

// Register
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide required fields"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });

        const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        verfyEmail(token, email);
        newUser.token = token;

        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "user Register Successfully.",
            user: newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "registrtion error"
        })
    }
}

// Verify Eamil 
export const verfy = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(400).json({
                success: false,
                message: "authorization token invalid"
            })
        }
        const token = authHeader?.split(" ")[1];
        let decode;
        try {
            decode.jwt.verfy(token, process.env.JWT_SECRET_KEY)
        } catch (error) {
            console.log("token expiry error")
            return res.status(400).json({
                message: false,
                message: "Token expiry error"
            })
        }
        const user = await User.findById(decode.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        user.token = null;
        user.isVerified = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
};

// Login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "fill all fields"
            })
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "login error"
        })
    }
}