import { sign, verify } from "jsonwebtoken";
import { Context } from "koa";
import modelUser from "../models/modelUser";

export default async (ctx: Context) => {
    const token = ctx.cookies.get("token");
    if (token) {
        try {
            const { ID }: any = verify(token, process.env.JWT_SECRET ?? "");
            const code: string = sign(
                { ID: ID, signature: process.env.SIGNATURE },
                process.env.JWT_SECRET ?? "",
                {
                    expiresIn: "10m",
                }
            );
            await modelUser.findOneAndUpdate({ id: ID }, { tokenLogin: code });
            ctx.body = {
                code: `${process.env.PREFIX}${code}`,
            };
        } catch (error) {
            ctx.redirect(process.env.CLIENT_REDIRECT_URL ?? "");
        }
        return;
    }
    ctx.redirect(process.env.CLIENT_REDIRECT_URL ?? "");
};
