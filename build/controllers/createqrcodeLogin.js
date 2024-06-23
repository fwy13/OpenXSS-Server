"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const modelUser_1 = __importDefault(require("../models/modelUser"));
exports.default = async (ctx) => {
    const token = ctx.cookies.get("token");
    if (token) {
        try {
            const { ID } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET ?? "");
            const code = (0, jsonwebtoken_1.sign)({ ID: ID, signature: process.env.SIGNATURE }, process.env.JWT_SECRET ?? "", {
                expiresIn: "10m",
            });
            await modelUser_1.default.findOneAndUpdate({ id: ID }, { tokenLogin: code });
            ctx.body = {
                code: `${process.env.PREFIX}${code}`,
            };
        }
        catch (error) {
            ctx.redirect(process.env.CLIENT_REDIRECT_URL ?? "");
        }
        return;
    }
    ctx.redirect(process.env.CLIENT_REDIRECT_URL ?? "");
};
//# sourceMappingURL=createqrcodeLogin.js.map