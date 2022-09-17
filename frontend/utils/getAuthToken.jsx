export default async function getAuthToken(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    // TODO: redirect to homepage.
    return {};
  }

  const clientId = process?.env?.client_id;
  const clientSecret = process?.env?.client_secret;
  const redirectUri = process?.env?.redirect_uri;

  // TODO: Add better error handling.
  if (!clientId || !clientSecret) return null;

  const authString = new Buffer(clientId + ":" + clientSecret).toString(
    "base64"
  );

  const jsonBody = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
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
      Authorization: `Basic ${authString}`,
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: formBody,
  });

  try {
    const data = await response.json();
    const accessToken = data?.access_token;
    const refreshToken = data?.refresh_token;
    const authExpiresIn = data?.expires_in;

    return {
      accessToken,
      refreshToken,
      authExpiresIn,
    };
  } catch {
    return {};
  }
}
