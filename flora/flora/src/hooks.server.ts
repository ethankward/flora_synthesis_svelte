import type { Handle } from "@sveltejs/kit";
import { HTTP_AUTH_LOGIN } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {

    const auth = event.request.headers.get("Authorization");

    if (auth !== `Basic ${btoa(HTTP_AUTH_LOGIN)}`) {
        return new Response("Not authorized", {
            status: 401,
            headers: {
                "WWW-Authenticate":
                    'Basic realm="User Visible Realm", charset="UTF-8"',
            },
        });
    }

    return resolve(event);
};
