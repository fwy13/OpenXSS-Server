"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (ctx) => {
    ctx.cookies.set("token", null);
    ctx.redirect(process.env.CLIENT_REDIRECT_URL ?? "");
};
//# sourceMappingURL=discordLogout.js.map