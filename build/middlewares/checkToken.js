"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const modelUser_1 = __importDefault(require("../models/modelUser"));
exports.default = async (ctx, next) => {
    const token = ctx.cookies.get("token");
    try {
        const { ID } = (0, jsonwebtoken_1.verify)(token ?? "", process.env.JWT_SECRET ?? "");
        const UserData = await modelUser_1.default.findOne({ id: ID });
        const name = UserData.name;
        const id = UserData.id;
        const avatar = UserData.avatar;
        ctx.state.user = { error: false, name, id, avatar };
    }
    catch (error) {
        ctx.state.user = {
            error: true,
            name: null,
            id: null,
            avatar: null,
        };
    }
    next();
};
//# sourceMappingURL=checkToken.js.map