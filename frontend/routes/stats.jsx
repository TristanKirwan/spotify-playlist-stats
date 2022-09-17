import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function Stats() {
  const fetcher = useFetcher();
  const textInput = useRef();

  useEffect(() => {
    if (fetcher.data) {
      console.log("fetcher.data", fetcher.data);
    }
  }, [fetcher.data]);

  function fillInId(e, year = 2022) {
    e.preventDefault();
    if (!textInput?.current) return;

    const playlistIds = {
      2022: "3NQ42UOhvdXToVPoDkmSRG",
      2021: "02TvflP0z04CtkSTMmY16H",
    };
    const idOfPlaylistYear = playlistIds[year];
    if (!idOfPlaylistYear) return;

    textInput.current.value = idOfPlaylistYear;
  }

  return (
    <main>
      <fetcher.Form
        method="POST"
        action="/actions/getPlaylistInfo"
        encType="multipart/formdata"
        className="flex flex-col gap-8 justify-start max-w-[400px]"
      >
        <div className="flex gap-2">
          <button
            onClick={(e) => fillInId(e, 2021)}
            className="border border-orange px-4 py-2"
          >
            Use 2021's playlist
          </button>
          <button
            onClick={(e) => fillInId(e, 2022)}
            className="border border-orange px-4 py-2"
          >
            Use 2022's playlist
          </button>
        </div>
        <label className="flex flex-col">
          <span>Spotify playlist id</span>
          <input
            type="text"
            name="playlistID"
            required
            placeholder="Spotify playlist id"
            className="p-x-4 p-y-2 text-black"
            ref={textInput}
          />
        </label>
        {fetcher?.data && fetcher?.data?.error && (
          <span>
            Something went wrong retrieving the playlist data. Please try again
            later.
          </span>
        )}
        <button className="border border-orange px-4 py-2">Get data</button>
      </fetcher.Form>
    </main>
  );
}
