"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const modelUser_1 = __importDefault(require("../models/modelUser"));
exports.default = async (ctx) => {
    if (!ctx.query.code)
        throw new Error("Code not provided.");
    const { code } = ctx.query;
    const data = new URLSearchParams();
    data.append("client_id", process.env.client_id ?? "");
    data.append("client_secret", process.env.client_secret ?? "");
    data.append("grant_type", "authorization_code");
    data.append("code", typeof code === "string" ? code : "");
    data.append("redirect_uri", process.env.uri_callback_discord ?? "");
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/x-www-form-urlencoded",
    };
    const response = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: headers,
        body: data,
    }).then((res) => res.json());
    const UserData = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `${response.token_type} ${response.access_token}`,
            ...headers,
        },
    }).then((res) => res.json());
    const { id, global_name, username, avatar } = UserData;
    const token = (0, jsonwebtoken_1.sign)({ ID: id }, process.env.JWT_SECRET ?? "", {
        expiresIn: "30d",
    });
    const CheckUserExist = await modelUser_1.default.findOne({ id: id }).exec();
    if (!CheckUserExist) {
        const userData = new modelUser_1.default({
            id: id,
            name: global_name ? global_name : username,
            avatar: avatar
                ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
                : global_name
                    ? global_name
                    : username,
            tokenLogin: "",
        });
        userData.save();
    }
    ctx.cookies.set("token", token);
    ctx.redirect(process.env.CLIENT_REDIRECT_URL ?? "");
};
//# sourceMappingURL=discordCallback.js.map