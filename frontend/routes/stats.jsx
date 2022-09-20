import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import Cta from "../components/Cta";
import TextInput from "../components/TextInput";

export default function Stats() {
  const fetcher = useFetcher();
  const textInput = useRef();
  const submitButtonRef = useRef();

  useEffect(() => {
    if (fetcher.data) {
      console.log("fetcher.data", fetcher.data);
    }
  }, [fetcher.data]);

  function fillInId(e, year = 2022) {
    e.preventDefault();
    if (!textInput?.current || !submitButtonRef?.current) return;

    const playlistIds = {
      2022: "3NQ42UOhvdXToVPoDkmSRG",
      2021: "02TvflP0z04CtkSTMmY16H",
    };
    const idOfPlaylistYear = playlistIds[year];
    if (!idOfPlaylistYear) return;

    textInput.current.value = idOfPlaylistYear;

    // Not sure why, but we cant just submit the form because then the form
    // navigates to the action route.
    submitButtonRef.current.click();
  }

  return (
    <div className="stats-page-wrapper min-h-screen">
      <aside className="px-4 py-10 border-b border-true-white/30 md:border-b-0 md:border-r">
        <fetcher.Form
          method="POST"
          action="/actions/getPlaylistInfo"
          encType="multipart/formdata"
          className="flex flex-col gap-12 justify-start max-w-[400px]"
        >
          <div className="flex flex-col gap-4">
            <p className="text-body-3">
              Fill in the playlist ID to get started:
            </p>
            <label className="flex flex-col gap-2">
              <span className="px-4">Playlist id</span>
              <TextInput
                name="playlistID"
                required
                placeholder="Example: 3NQ42UOhvdXToVPoDkmSRG"
                passedRef={textInput}
              />
            </label>
            <div>
              {fetcher?.data && fetcher?.data?.error && (
                <span>
                  Something went wrong retrieving the playlist data. Please try
                  again later.
                </span>
              )}
              <Cta isLink={false} passedRef={submitButtonRef}>
                Get data
              </Cta>
            </div>
          </div>
          <div>
            <p className="text-body-3 mb-4">Or choose a preset:</p>
            <div className="flex gap-2 flex-wrap">
              <Cta onClick={(e) => fillInId(e, 2021)}>Omroep Grunn</Cta>
              <Cta onClick={(e) => fillInId(e, 2021)}>
                Zweden mixtape vol III
              </Cta>
            </div>
          </div>
        </fetcher.Form>
      </aside>
      <main className="px-4 py-10">
        {
          <h1 className="font-barlow-bold text-heading-2 text-center">
            <span className="hidden md:block">
              👈 Get started by getting playlist data
            </span>
            <span className="block md:hidden">
              👆 Get started by getting playlist data
            </span>
          </h1>
        }
      </main>
    </div>
  );
}
