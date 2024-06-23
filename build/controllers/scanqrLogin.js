"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const modelUser_1 = __importDefault(require("../models/modelUser"));
exports.default = async (ctx) => {
    const { qrcode } = ctx.query;
    if (qrcode) {
        const PREFIX = qrcode.slice(0, process.env.PREFIX?.length);
        const checkExistPREFIX = PREFIX === process.env.PREFIX;
        const code = qrcode.slice(process.env.PREFIX?.length);
        if (checkExistPREFIX) {
            try {
                const { ID, signature } = (0, jsonwebtoken_1.verify)(code, process.env.JWT_SECRET ?? "");
                const checkUser = await modelUser_1.default.findOne({ id: ID });
                if (checkUser && signature === process.env.SIGNATURE) {
                    if (code === checkUser.tokenLogin) {
                        const token = (0, jsonwebtoken_1.sign)({ ID: checkUser.id }, process.env.JWT_SECRET ?? "", {
                            expiresIn: "30d",
                        });
                        ctx.cookies.set("token", token);
                        ctx.redirect(process.env.CLIENT_REDIRECT_URL ?? "");
                        return;
                    }
                    ctx.body = {
                        error: true,
                        content: "Code expired!",
                    };
                    return;
                }
                ctx.body = {
                    error: true,
                    content: "No found code or code expired!",
                };
            }
            catch (error) {
                ctx.body = {
                    error: true,
                    content: "Your code wrong!",
                };
            }
            return;
        }
        ctx.body = {
            error: true,
            content: "Your code no PREFIX!",
        };
        return;
    }
    ctx.body = {
        error: true,
        content: "No found code in url!",
    };
};
//# sourceMappingURL=scanqrLogin.js.map