"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./routers"));
(0, dotenv_1.config)();
const app = new koa_1.default();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, koa_bodyparser_1.default)());
app.use(routers_1.default.routes());
app.use(routers_1.default.allowedMethods());
app.listen(PORT, async () => {
    await mongoose_1.default.connect(process.env.mongodb_url ?? "");
    console.log(`Server running in http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map