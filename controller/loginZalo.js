import generate_state_param from "../Utils/func_utils.js";
import pkceChallenge from "pkce-challenge";


export default async (ctx) => {
    const app_id = process.env.app_id;
    const { code_challenge, code_verifier } = await pkceChallenge(43);
    ctx.cookies.set("code-verify", code_verifier);
    const state = generate_state_param();
    const url = `https://oauth.zaloapp.com/v4/permission?app_id=${app_id}&redirect_uri=${process.env.urlBase}/zalo/callback&code_challenge=${code_challenge}&state=${state}`;
    await ctx.redirect(url);
};
