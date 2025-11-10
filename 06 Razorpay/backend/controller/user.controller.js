import { User } from "../models/user.model";


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

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
        });

        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "user Register Successfully.",
            user: newUser
        });

    } catch (error) {
        console.log(error);
    }
}