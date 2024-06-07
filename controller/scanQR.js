import qrCode from "../model/qrCode.js";
import User from "../model/User.js";

export default async (ctx) => {
    const { qr, id, name, avatar } = ctx.query;
    if (!id || !name || !qr || !avatar) {
        ctx.body = {
            error: true,
            content: "Vui lòng gửi đầy đủ cái giá trị!",
        };
    } else {
        const CheckQRExist = await qrCode.findOne({ qrCode: qr }).exec();
        const CheckIdExist = await User.findOne({ id: id }).exec();
        if (CheckQRExist && CheckIdExist) {
            await qrCode.findOneAndUpdate(
                { qrCode: qr },
                { status: 1, idUser: id, avatar: avatar, name: name }
            );
            ctx.body = {
                error: false,
                content: "Quét mã qr thành công!",
            };
        } else {
            ctx.body = {
                error: true,
                content:
                    "Không tìm thấy qr code trong hệ thống hoặc đã hết hạn!",
            };
        }
    }
};
