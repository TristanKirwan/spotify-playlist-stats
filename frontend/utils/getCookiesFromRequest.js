export default function getCookiesFromRequest(requestCookies) {
  if (!requestCookies || typeof requestCookies !== "string") return {};
  const pairs = requestCookies.split(";");
  const cookies = {};

  for (let i = 0; i < pairs.length; i++) {
    const nameValue = pairs[i].split("=");
    cookies[nameValue[0].trim()] = nameValue[1];
  }

  return cookies;
}
