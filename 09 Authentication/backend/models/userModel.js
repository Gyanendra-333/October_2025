import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // password by default return nahi karega
        },

        phone: {
            type: String,
            required: true,
        },

        accountVerified: {
            type: Boolean,
            default: false,
        },

        verificationCode: {
            type: String,
        },

        verificationCodeExpire: {
            type: Date,
        },

        resetPasswordToken: {
            type: String,
        },

        resetPasswordExpire: {
            type: Date,
        },
    },
    {
        timestamps: true, // createdAt & updatedAt automatically add ho jayenge
    }
);

// ======================================================
// 🔥 Password Hashing (before saving into DB)
// ======================================================
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ======================================================
// 🔥 Compare User Password Method
// ======================================================
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
