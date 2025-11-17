import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User.model";
import bcrypt from "bcryptjs";

// Regisetr 
export async function POST(request: Request) {
    await dbConnect();

    try {
        const { userName, email, password } = await request.json();

        // Validate incoming data
        if (!userName || !email || !password) {
            return Response.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        // Check existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return Response.json(
                { success: false, message: "Email already registered" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await userModel.create({
            userName,
            email,
            password: hashedPassword,
        });

        return Response.json(
            {
                success: true,
                message: "User Registered Successfully",
                user: {
                    id: newUser._id,
                    userName: newUser.userName,
                    email: newUser.email,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.log("Error Registering User", error);
        return Response.json(
            {
                success: false,
                message: "Register Error",
            },
            { status: 500 }
        );
    }
}
