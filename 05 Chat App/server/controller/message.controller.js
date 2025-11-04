import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js"
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary"
import { getReceiverSocketId, io } from "../utils/socket.js";

// Get All User 
export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const filteredUser = await User.find({ _id: { $ne: user } }).select("-password");

    res.status(200).json({
        success: true,
        users: filteredUser
    });
})

// Get Message 
export const getMessage = catchAsyncError(async (req, res, next) => {
    const recieverId = req.params.id;
    const myId = req.user._id;

    const receiver = await User.findById(recieverId);
    if (!receiver) {
        return res.status(400).json({
            success: false,
            message: "ReceiverId is invalid"
        })
    }
    const messages = await Message.find({
        $or: [
            { senderId: myId, recieverId: recieverId },
            { senderId: recieverId, recieverId: myId }
        ]
    }).sort({ createdAt: 1 })

    res.status(200).json({
        success: true,
        messages
    })

});


// Send Message 
export const sendMessage = catchAsyncError(async (req, res, next) => {
    const { text } = req.body;
    const media = req?.files?.media;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    const receiver = await User.findById(recieverId);
    if (!receiver) {
        return res.status(400).json({
            success: false,
            message: "Receiver Id invalid"
        })
    }

    const sanitizeText = text?.trim() || "";
    if (!sanitizeText || !media) {
        return res.status(400).json({
            success: false,
            message: "can't send empty message"
        })
    }

    let mediaUrl = "";
    if (media) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(
                media.tempfilepath,
                {
                    resource_type: "auto",
                    folder: "CHAT_APP",
                    transformation: [
                        { width: 720, height: 720, crop: "limit" },
                        { quality: "auto" },
                        { fetch_format: "auto" }
                    ]
                }
            )
            mediaUrl = uploadResponse?.secure_url;
        } catch (error) {
            console.log("Cloudinary upload error", error)
            return res.status(400).json({
                success: false,
                message: "Failed to upload media.", error
            })
        }
    }

    const newMessage = await Message.create({
        senderId,
        recieverId,
        text: sanitizeText,
        media: mediaUrl
    })

    const receiverSocketId = getReceiverSocketId(recieverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);

});