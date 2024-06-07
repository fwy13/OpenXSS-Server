import qrCode from "../model/qrCode.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;


export default async (ctx) => {
    const { qr } = ctx.query;
    const checkScaned = await qrCode.findOne({ qrCode: qr, status: 1 });
    if (checkScaned) {
        const token = await sign(
            { ID: checkScaned.idUser },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );
        ctx.cookies.set("token", token);
        ctx.body = {
            token: token,
            id: checkScaned.idUser,
            name: checkScaned.name,
            avatar: checkScaned.avatar,
        };
    } else {
        ctx.body = {
            error: true,
            content: "Người dùng chưa quét mã!",
        };
    }
};
