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
export const verfyUserEmail = () => {

};