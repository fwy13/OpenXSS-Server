import pkg from "jsonwebtoken";

const { verify } = pkg;

export default async (ctx, next) => {
    const token = ctx.cookies.get("token");
    try {
        const { id, name, avatar } = verify(token, process.env.JWT_SECRET);
        ctx.state.user = { id, name, avatar };
    } catch (error) {
        ctx.state.user = null;
    }
    next();
};
