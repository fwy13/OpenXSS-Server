import pkg from "jsonwebtoken";
import User from "../model/User.js";

const { sign } = pkg;

export default async (ctx) => {
    if (!ctx.query.code) throw new Error("Code not provided.");
    const { code } = ctx.query;
    const data = new URLSearchParams({
        client_id: process.env.clientId,
        client_secret: process.env.clientSECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.uri_callback_discord,
    });
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

    const { id: ids, username, avatar } = UserData;

    const token = await sign({ ID: ids }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    const CheckUserExist = await User.findOne({ id: ids }).exec();

    if (!CheckUserExist) {
        const userData = new User({
            id: ids,
            name: username,
            avatar: avatar,
        });
        userData.save();
    }
    ctx.cookies.set("token", token);
    ctx.redirect(process.env.CLIENT_REDIRECT_URL);
};
