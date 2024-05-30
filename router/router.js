import Router from "@koa/router";
import loginZalo from "../controller/loginZalo.js";
import zaloCallback from "../controller/zaloCallback.js";
import loginDiscord from "../controller/loginDiscord.js";
import discordCallback from "../controller/discordCallback.js";

const router = new Router();


// router.get("/zalo/login", loginZalo); Router only run in ip VIETNAM:<
// router.get("/zalo/callback", zaloCallback); Router only run in ip VIETNAM:<

router.get("/discord/login", loginDiscord)
router.get("/discord/callback", discordCallback)


export default router;