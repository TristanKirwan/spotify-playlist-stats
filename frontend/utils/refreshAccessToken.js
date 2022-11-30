import { authTokenCookie, refreshTokenCookie } from "./cookies";

export default async function refreshAccessToken({ request }) {
  const cookies = request.headers.get("cookie");

  const refreshTokenVal = await refreshTokenCookie.parse(cookies);
  const clientId = process?.env?.client_id;
  const clientSecret = process?.env?.client_secret;

  const authString = new Buffer(clientId + ":" + clientSecret).toString(
    "base64"
  );

  const jsonBody = {
    grant_type: "refresh_token",
    refresh_token: refreshTokenVal,
  };

  let formBody = [];
  for (var property in jsonBody) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(jsonBody[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + authString,
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: formBody,
  });

  try {
    const data = await response.json();
    const newAccessToken = data?.access_token;

    if (!newAccessToken) {
      throw data;
    }

    await authTokenCookie.serialize(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.log(
      "Something went wrong trying to refresh the auth token.",
      error
    );
    throw error;
  }
}
