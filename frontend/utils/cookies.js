import { createCookie } from "@remix-run/node"; // or "@remix-run/cloudflare"

export const authTokenCookie = createCookie("aToken");
export const refreshTokenCookie = createCookie("rToken");
