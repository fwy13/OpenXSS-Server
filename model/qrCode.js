import mongoose from "mongoose";

const qrCode = new mongoose.Schema(
    {
        qrCode: String,
        status: Number,
        idUser: String,
        avatar: String,
        name: String
    },
    { timestamps: true }
);

export default mongoose.model("qrCode", qrCode);
