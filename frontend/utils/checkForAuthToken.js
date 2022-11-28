import { redirect } from "@remix-run/node";
import { authTokenCookie, refreshTokenCookie } from "./cookies";

export default async function checkForAuthToken(request) {
  const cookies = request.headers.get("cookie");

  const hasAuthToken = await authTokenCookie.parse(cookies);
  const hasRefreshToken = await refreshTokenCookie.parse(cookies);

  if (!hasAuthToken || !hasRefreshToken) {
    throw redirect("/");
  }

  return;
}
