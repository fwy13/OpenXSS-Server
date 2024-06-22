import { Context } from "koa";

export default async (ctx: Context) => {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${process.env.client_id}&redirect_uri=${process.env.uri_callback_discord}&response_type=code&scope=identify`;
    ctx.redirect(url);
};
