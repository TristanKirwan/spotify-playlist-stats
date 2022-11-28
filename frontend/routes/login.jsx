import { redirect } from "@remix-run/node";
import { authTokenCookie, refreshTokenCookie } from "../utils/cookies";
import generateAuthorizationLink from "../utils/generateAuthorizationLink";
import getAuthToken from "../utils/getAuthToken";

export const loader = async ({ request }) => {
  const { accessToken, refreshToken, authExpiresIn } = await getAuthToken(
    request
  );
  if (accessToken && refreshToken && authExpiresIn) {
    const headers = new Headers();
    headers.append("Set-Cookie", await authTokenCookie.serialize(accessToken));
    headers.append(
      "Set-Cookie",
      await refreshTokenCookie.serialize(refreshToken)
    );

    return redirect("/stats", {
      headers,
    });
  } else {
    return redirect("/");
  }
};

export default function Login() {
  const authorizationLink = generateAuthorizationLink();

  return (
    <div>
      <h1>
        If you are seeing this page, something must have gone wrong. Sorry!
      </h1>
      <a href="/">Go home</a>
      <a href={authorizationLink}>Try again</a>
    </div>
  );
}
