import { json } from "@remix-run/node";
import { authTokenCookie, refreshTokenCookie } from "../../utils/cookies";
import refreshAccessToken from "../../utils/refreshAccessToken";

async function getPlaylistName(playlistID, token) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistID}`,
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
    if (data?.error) {
      // Spotify can throw a valid response with an error, if there is one we
      // will throw
      throw data?.error;
    }
    const name = data?.name;
    return name;
  } catch (error) {
    console.log("Something went wrong retrieving playlist metadata.", error);
    throw error;
  }
}

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
    console.log(
      "something went wrong getting a segment of playlist items.",
      error
    );
    throw error;
  }
}

async function getPlaylistInfo(playlistID, accessToken) {
  try {
    const playlistName = await getPlaylistName(playlistID, accessToken);
    const trackData = await getItemsSegment(0, playlistID, accessToken);

    if (!trackData || !playlistName) {
      return {
        error: true,
      };
    }
    const filteredData = trackData.filter((item) => item?.track);
    return {
      name: playlistName,
      tracks: filteredData,
    };
  } catch (error) {
    throw error;
  }
}

async function handleTokenError(responseHeaders, errorMessage) {
  // Reset cookie value both internally and in browser
  responseHeaders.append(
    "Set-Cookie",
    await authTokenCookie.serialize(null, {
      expires: new Date(Date.now()),
    })
  );
  responseHeaders.append(
    "Set-Cookie",
    await refreshTokenCookie.serialize(null, {
      expires: new Date(Date.now()),
    })
  );

  return json(
    { error: errorMessage },
    {
      headers: responseHeaders,
    }
  );
}

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const { playlistID } = formData;

  const cookieHeader = request.headers.get("cookie");
  let accessToken = (await authTokenCookie.parse(cookieHeader)) || null;

  if (!accessToken) return { error: true };

  const responseHeaders = new Headers();

  try {
    const data = await getPlaylistInfo(playlistID, accessToken);
    return data;
  } catch (e) {
    // Invalid or expired auth token will try to get a new one. If that fails
    // the cookies are reset and user is redirected.
    if (e?.status === 401 || e?.status === 400) {
      let newAccessToken = null;
      try {
        newAccessToken = await refreshAccessToken({ request });

        // If auth token cannot be refreshed, catch is hit. Otherwise we
        // continue with the assumption of a correct auth token.
        const data = await getPlaylistInfo(playlistID, newAccessToken);

        // Make sure we update the accessToken cookie
        responseHeaders.append(
          "Set-Cookie",
          await authTokenCookie.serialize(newAccessToken)
        );
        return json(data, {
          headers: responseHeaders,
        });
      } catch (e) {
        return await handleTokenError(
          responseHeaders,
          `Something went wrong trying to get playlist info with an expired auth token. ${e}`
        );
      }
    }
  }

  // Should never hit, but as a backup we return an error object.
  return {
    error: true,
  };
};
