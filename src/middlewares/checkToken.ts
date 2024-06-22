import pkg from "jsonwebtoken";
import User from "../models/modelUser";
import { Context, Next } from "koa";

const { verify } = pkg;

type userData = {
    id: string;
    name: string;
    avatar: string;
    tokenLogin: string;
};

export default async (ctx: Context, next: Next) => {
    const token = ctx.cookies.get("token");
    try {
        const { ID }: any = verify(token ?? "", process.env.JWT_SECRET ?? "");
        const UserData: userData | any = await User.findOne({ id: ID });

        const name = UserData.name;
        const id = UserData.id;
        const avatar = UserData.avatar;
 
        ctx.state.user = { name, id, avatar };
    } catch (error) {
        ctx.state.user = undefined;
    }
    next();
};
