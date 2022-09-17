import { redirect } from "@remix-run/node";
import generateAuthorizationLink from "../utils/generateAuthorizationLink";
import getAuthToken from "../utils/getAuthToken";
import returnEnvVars from "../utils/returnEnvVars";

export const loader = async ({ request }) => {
  const { accessToken, refreshToken, authExpiresIn } = await getAuthToken(
    request
  );
  if (accessToken && refreshToken && authExpiresIn) {
    return redirect("/stats", {
      headers: {
        "Set-Cookie": `aToken=${accessToken}; Max-Age=${authExpiresIn}`,
        "Set-Cookie": `rToken=${refreshToken};`,
      },
    });
  } else {
    return returnEnvVars();
  }
};

export default function Login() {
  const authorizationLink = generateAuthorizationLink();

  console.log("authorizationLink", authorizationLink);
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
