import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
    content: string,
    createdAt: Date
};

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

});

export interface User extends Document {
    userName: String,
    email: string,
    password: string,
    verifyCode: string,
    isVerified: boolean,
    verifyCodeExpiry: Date,
    isAcceptingMessage: boolean,
    messages: Message[]
};


const UserSchema: Schema<User> = new Schema({
    userName: {
        type: String,
        required: [true, "userName is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    verifyCode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyCodeExpiry: {
        type: Date,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]


});

const userModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default userModel;
