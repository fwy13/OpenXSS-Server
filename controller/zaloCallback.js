import pkg from "jsonwebtoken";
const { sign } = pkg;

export default async (ctx) => {
    const { code } = ctx.query;
    if (!code) throw new Error("Code not provided.");
    const data = new URLSearchParams({
        code: code,
        code_verifier: ctx.cookies.get("code-verify"),
        grant_type: "authorization_code",
        app_id: process.env.app_id,
    });

    const response = await fetch("https://oauth.zaloapp.com/v4/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            secret_key: process.env.secret_key,
        },
        body: data,
    }).then((res) => res.json());
    console.log({response}, 'in line 23')
    const { access_token } = response;
    const UserData = await fetch(
        "https://graph.zalo.me/v2.0/me?fields=id,name,picture",
        {
            headers: {
                access_token: access_token,
            },
        }
    )
        .then((res) => res.json())
        .then((UserData) => {
            return UserData;
        });
    console.log(UserData, 'in line 36')
    if (UserData.error === 0) {
        const token = await sign(
            {
                name: UserData.name,
                id: UserData.id,
                avatar: UserData.picture.data.url,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );
        ctx.cookies.set("code-verify", null); // Delete code_verifier
        ctx.cookies.set("token", token);
        ctx.redirect(process.env.CLIENT_REDIRECT_URL);
    } else {
        ctx.body = "Error";
    }
};
