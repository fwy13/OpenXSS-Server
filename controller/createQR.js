import qrCode from "../model/qrCode.js";

const RandomString = (length) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
};

export default async (ctx) => {
    const qr = RandomString(20);
    const newQRCode = new qrCode({
        qrCode: qr,
        idUser: "",
        avatar: "",
        name: "",
        status: 0,
    });
    newQRCode.save();
    setTimeout(async () => {
        await qrCode.findOneAndDelete({ qrCode: qr });
    }, 600000); // Delete after 10 minutes (600 000 ms)
    ctx.body = { qr, expireAfterSeconds: 600 };
};
