import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js"
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

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
export const sendMessage = catchAsyncError(async (req, res, next) => { })