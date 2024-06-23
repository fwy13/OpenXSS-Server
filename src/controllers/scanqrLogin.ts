import { sign, verify } from "jsonwebtoken";
import { Context } from "koa";
import modelUser from "../models/modelUser";

export default async (ctx: Context) => {
    const { qrcode } = ctx.query;
    if (qrcode) {
        const PREFIX = qrcode.slice(0, process.env.PREFIX?.length);
        const checkExistPREFIX = PREFIX === process.env.PREFIX;
        const code: string | any = qrcode.slice(process.env.PREFIX?.length);
        if (checkExistPREFIX) {
            try {
                const { ID, signature }: any = verify(
                    code,
                    process.env.JWT_SECRET ?? ""
                );
                const checkUser = await modelUser.findOne({ id: ID });
                if (checkUser && signature === process.env.SIGNATURE) {
                    if (code === checkUser.tokenLogin) {
                        const token: string = sign(
                            { ID: checkUser.id },
                            process.env.JWT_SECRET ?? "",
                            {
                                expiresIn: "30d",
                            }
                        );
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
            } catch (error) {
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
