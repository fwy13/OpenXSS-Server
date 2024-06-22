import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        id: String,
        name: String,
        avatar: String,
        tokenLogin: String
    },
    { timestamps: true }
);

export default mongoose.model("User", User);