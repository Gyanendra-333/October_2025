import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    text: {
        type: String,
    },
    media: {
        type: String,
    },

},
    {
        timestamps: true
    }
);

export const Message = mongoose.model("Message", messageSchema);
