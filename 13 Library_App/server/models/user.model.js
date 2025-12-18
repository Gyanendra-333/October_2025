import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [5, "Name cannot exceed 5 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [4, "Password must be at least 4 characters"],
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        accountVerified: {
            type: Boolean,
            default: false
        },
        borrowBooks: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Borrow"
        },
        returned: {
            type: Boolean,
            default: false
        },
        bookTitle: String,
        borrowDate: Date,
        dueDate: Date,
        avatar: {
            public_id: String,
            url: String
        }
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", UserSchema);
