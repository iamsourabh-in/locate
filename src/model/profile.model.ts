import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface ProfileDocument extends mongoose.Document {
    user: UserDocument["_id"];
    profileName: string;
    profileId: string;
    name:string;
    email: string;
    phone: string;
    address: string;
    socials: [
        {
            name: string;
            image: string;
            icon: string;
            type: string;
            fullUrl: string;
            username: string;
            link: string
            createdAt: Date;
            updatedAt: Date;
        }
    ]
    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema = new mongoose.Schema(
    {
        profileId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Profile = mongoose.model<ProfileDocument>("profile", ProfileSchema);

export default Profile;
