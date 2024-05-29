import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { config } from "dotenv";
import serve from "koa-static"

import router from "./router/router.js";
import auth from "./middleware/auth.js";
config();

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        credentials: true,
    })
);

router.use(auth);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve('.'));


router.get("/user/me", async (ctx) => {
    ctx.body = ctx.state.user;
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
