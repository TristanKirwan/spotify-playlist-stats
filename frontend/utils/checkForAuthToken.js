import { redirect } from "@remix-run/node";

export default async function checkForAuthToken(request) {
  const cookie = request.headers.get("cookie");

  if (cookie.indexOf("aToken=") <= 0) {
    throw redirect("/");
  }

  return;
}
