import Koa, { Context } from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { config } from "dotenv";
import mongoose from "mongoose";
import router from "./routers";

config();

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        credentials: true,
    })
);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, async () => {
    await mongoose.connect(process.env.mongodb_url ?? "");
    console.log(`Server running in http://localhost:${PORT}`);
});
