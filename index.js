import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { config } from "dotenv";
import mongoose from "mongoose";

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


router.get("/user/discord", async (ctx) => {
    ctx.body = ctx.state.user;
});

app.listen(PORT, async () => {
    await mongoose.connect(process.env.mongoose_url)
    console.log(`Server running in http://localhost:${PORT}`);
});
