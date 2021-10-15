import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface ProfileDocument extends mongoose.Document {
    user: UserDocument["_id"];
    profileName: string;
    profileId: string;
    email: string;
    phone: string;
    address: string;
    viewcount: number;
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
            viewcount: number;
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
        profileName: {
            type: String,
            required: false
        },

        email: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        viewcount: {
            type: String,
            required: false
        },
        createdAt: {
            type: Date,
            required: false
        },
        updatedAt: {
            type: Date,
            required: false
        },
        socials: [
            {
                name: {
                    type: String,
                    required: true
                },
                image: {
                    type: String,
                    required: false
                },
                icon: {
                    type: String,
                    required: false
                },
                type: {
                    type: String,
                    required: true
                },
                fullUrl: {
                    type: String,
                    required: false
                },
                username: {
                    type: String,
                    required: true
                },
                link: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    required: false
                },
                updatedAt: {
                    type: Date,
                    required: false
                },
                viewcount: {
                    type: Number,
                    required: false
                }
            }
        ]
    }
);

const Profile = mongoose.model<ProfileDocument>("profile", ProfileSchema);

export default Profile;
