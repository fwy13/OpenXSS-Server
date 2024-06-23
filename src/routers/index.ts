import Router from "@koa/router";
import loginDiscord from "../controllers/loginDiscord";
import discordCallback from "../controllers/discordCallback";
import discordLogout from "../controllers/discordLogout";
import checkToken from "../middlewares/checkToken";
import scanqrLogin from "../controllers/scanqrLogin";
import createqrcodeLogin from "../controllers/createqrcodeLogin";
const router = new Router();

// Login Discord
router.get("/discord/login", loginDiscord); // http://localhost:4040/discord/login
router.get("/discord/callback", discordCallback); // http://localhost:4040/discord/callback
router.get("/logout", discordLogout);

router.get("/user/discord",checkToken, async (ctx) => {
    ctx.body = ctx.state.user;
});

// Login QR
router.get('/scan-qr-code', scanqrLogin);
router.get('/create-qr-code', createqrcodeLogin);



export default router;
