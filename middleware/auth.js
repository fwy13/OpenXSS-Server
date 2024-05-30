import pkg from "jsonwebtoken";
import User from "../model/User.js";

const { verify } = pkg;

export default async (ctx, next) => {
    const token = ctx.cookies.get("token");
    try {
        const { ID } = verify(token, process.env.JWT_SECRET);
        const UserData = await User.findOne({id: ID})

        const name = UserData.name
        const id = UserData.id
        const avatar =  UserData.avatar

        ctx.state.user = {name, id, avatar};

    } catch (error) {
        ctx.state.user = null;
    }
    next();
};
