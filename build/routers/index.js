"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const loginDiscord_1 = __importDefault(require("../controllers/loginDiscord"));
const discordCallback_1 = __importDefault(require("../controllers/discordCallback"));
const discordLogout_1 = __importDefault(require("../controllers/discordLogout"));
const checkToken_1 = __importDefault(require("../middlewares/checkToken"));
const scanqrLogin_1 = __importDefault(require("../controllers/scanqrLogin"));
const createqrcodeLogin_1 = __importDefault(require("../controllers/createqrcodeLogin"));
const router = new router_1.default();
// Login Discord
router.get("/discord/login", loginDiscord_1.default); // http://localhost:4040/discord/login
router.get("/discord/callback", discordCallback_1.default); // http://localhost:4040/discord/callback
router.get("/logout", discordLogout_1.default);
router.get("/user/discord", checkToken_1.default, async (ctx) => {
    ctx.body = ctx.state.user;
});
// Login QR
router.get('/scan-qr-code', scanqrLogin_1.default);
router.get('/create-qr-code', createqrcodeLogin_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map