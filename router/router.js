import Router from "@koa/router";
import { RateLimit } from "koa2-ratelimit";

import loginDiscord from "../controller/loginDiscord.js";
import discordCallback from "../controller/discordCallback.js";

// import loginZalo from "../controller/loginZalo.js";
// import zaloCallback from "../controller/zaloCallback.js";
// import createQR from "../controller/createQR.js";
// import scanQR from "../controller/scanQR.js";
// import checkQR from "../controller/checkQR.js";

const router = new Router();

// const getQrCodeLimit = RateLimit.middleware({
//     interval: 60 * 100, // 60 seconds
//     max: 100,
// });

// router.get("/zalo/login", loginZalo); Router only run in ip VIETNAM:<
// router.get("/zalo/callback", zaloCallback); Router only run in ip VIETNAM:<

router.get("/discord/login", loginDiscord);
router.get("/discord/callback", discordCallback);

router.get("/logout", async (ctx) => {
    ctx.cookies.set("token", null);
    ctx.redirect(process.env.CLIENT_REDIRECT_URL);
});

// router.get("/create-qr", getQrCodeLimit, createQR);
// router.post("/scan-qr", scanQR);
// router.post("/check-qr", checkQR);

export default router;
