import Router from "@koa/router";
import loginZalo from "../controller/loginZalo.js";
import zaloCallback from "../controller/zaloCallback.js";

const router = new Router();


router.get("/auth/zalo/login", loginZalo);
router.get("/zalo/callback", zaloCallback);



export default router;