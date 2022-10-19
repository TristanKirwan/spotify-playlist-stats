import getCookiesFromRequest from "../../utils/getCookiesFromRequest";

async function getItemsSegment(offset = 0, playlistID, token) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistID}/tracks?offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );

  try {
    const data = await response.json();

    const requestOffset = data?.offset;
    const responseItems = data?.items;
    const playlistTotal = data?.total;
    const requestLimit = data?.limit;

    if (!Array.isArray(responseItems)) return null;

    const items = [];
    if (responseItems.length + requestOffset < playlistTotal) {
      const previousItems = await getItemsSegment(
        offset + requestLimit,
        playlistID,
        token
      );
      items.push(...previousItems);
    }

    items.push(...responseItems);

    return items;
  } catch (error) {
    console.log("something went wrong", error);
    return null;
  }
}

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const { playlistID } = formData;

  const cookieString = request.headers.get("cookie");
  const allCookies = getCookiesFromRequest(cookieString);
  const { aToken: accessToken } = allCookies;

  if (!accessToken) return { error: true };

  const data = await getItemsSegment(0, playlistID, accessToken);

  if (!data) {
    return {
      error: true,
    };
  }

  return data;
};
