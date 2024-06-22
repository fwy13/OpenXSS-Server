import pkg from "jsonwebtoken";
import User from "../models/modelUser";
import { Context } from "koa";

const { sign } = pkg;

type ResponseToken = {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
};

type ResponseUser = {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: string | null;
    global_name: string;
    avatar_decoration_data: string | null;
    banner_color: string | null;
    clan: string | null;
    mfa_enabled: boolean;
    locale: string;
    premium_type: number;
};

export default async (ctx: Context) => {
    if (!ctx.query.code) throw new Error("Code not provided.");
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

    const response: ResponseToken | any = await fetch(
        "https://discord.com/api/oauth2/token",
        {
            method: "POST",
            headers: headers,
            body: data,
        }
    ).then((res) => res.json());

    const UserData: ResponseUser | any = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `${response.token_type} ${response.access_token}`,
            ...headers,
        },
    }).then((res) => res.json());

    const { id, global_name, username, avatar } = UserData;

    const token: string = sign({ ID: id }, process.env.JWT_SECRET ?? "", {
        expiresIn: "30d",
    });

    const CheckUserExist = await User.findOne({ id: id }).exec();

    if (!CheckUserExist) {
        const userData = new User({
            id: id,
            name: global_name ? global_name : username,
            avatar: avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : global_name ? global_name : username,
        });
        userData.save();
    }
    ctx.cookies.set("token", token);
    ctx.redirect(process.env.CLIENT_REDIRECT_URL ?? "");
};
