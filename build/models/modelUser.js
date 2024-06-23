"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    id: String,
    name: String,
    avatar: String,
    tokenLogin: String
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", User);
//# sourceMappingURL=modelUser.js.map