import { Context } from "koa";

export default async (ctx: Context) => {
    ctx.cookies.set("token", null);
    ctx.redirect(process.env.CLIENT_REDIRECT_URL ?? "");
}