import mongoose, { model, models, Schema } from "mongoose";

export const VideoDimensions = {
    width: 1080,
    height: 1920
} as const;

export interface IVideos {
    _id?: mongoose.Types.ObjectId,
    title: string,
    description: string,
    videoUrl: string,
    thumnalUrl: string,
    controls: boolean,
    transformation?: {
        height: number,
        width: number,
        quality?: number
    }
};

const videoSchema = new Schema<IVideos>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumnalUrl: {
        type: String,
        required: true
    },
    controls: {
        type: Boolean,
        default: true
    },
    transformation: {
        height: {
            type: Number,
            default: VideoDimensions
        },
        width: {
            type: Number,
            default: VideoDimensions
        },
        quality: {
            type: Number,
            min: 1,
            max: 100
        }
    }


}, { timestamps: true });

const Video = models?.Video || model<IVideos>("Video", videoSchema);

export default Video;
