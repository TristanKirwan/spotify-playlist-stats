import clsx from "clsx";
import { useEffect, useRef } from "react";
import CircleLoader from "./CircleLoader";
import CTA from "./Cta";
import Popup from "./Popup";
import TextInput from "./TextInput";

export default function PlaylistPopup({ isOpen, closeCallBack, fetcher }) {
  const textInputRef = useRef(null);

  // Needed to prevent automatic closing after retrieving data once.
  const hasReceivedData = useRef(false);

  useEffect(() => {
    // Data was found.
    if (
      Array.isArray(fetcher?.data?.tracks) &&
      !fetcher?.data?.error &&
      !hasReceivedData.current
    ) {
      closeCallBack();
      hasReceivedData.current = true;
    }
  }, [fetcher?.data, closeCallBack]);

  useEffect(() => {
    if (isOpen && hasReceivedData.current) {
      hasReceivedData.current = false;
    }
    // TODO: Remove.
    if (isOpen) {
      fetcher.submit(
        { playlistID: "3NQ42UOhvdXToVPoDkmSRG" },
        { method: "POST", action: "/actions/getPlaylistInfo" }
      );
    }
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      closeCallback={closeCallBack}
      allowScrolling={fetcher?.state !== "submitting"}
    >
      <div className="relative flex flex-col gap-8 ">
        {/* Loader */}
        <div
          className={clsx(
            "absolute top-0 left-0 w-[calc(100%_+_4rem)] h-[calc(100%_+_3rem)] -translate-x-8 -translate-y-8 bg-text/80 flex items-center justify-center transition-opacity",
            fetcher?.state === "submitting"
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          )}
        >
          <CircleLoader />
        </div>
        <h2 className="font-barlow-bold text-body-1">Get playlist data</h2>
        {/* Form */}
        <fetcher.Form
          method="POST"
          action="/actions/getPlaylistInfo"
          encType="multipart/formdata"
          className="flex flex-col justify-start gap-8"
        >
          <label className="flex flex-col gap-2">
            <span className="font-barlow-semibold">Playlist id</span>
            <TextInput
              name="playlistID"
              required
              placeholder="Example: 3NQ42UOhvdXToVPoDkmSRG"
              passedRef={textInputRef}
            />
          </label>
          <div>
            {fetcher?.data && fetcher?.data?.error && (
              <span className="block mb-2 text-tertiary font-barlow-semibold">
                Something went wrong retrieving the playlist data. Please try
                again later.
              </span>
            )}
            <CTA isLink={false} disabled={fetcher?.state === "submitting"}>
              Get data
            </CTA>
          </div>
        </fetcher.Form>
        {/* Instructions */}
        <div className="flex flex-col gap-3">
          <span className="font-barlow-semibold text-body-2">
            How to retrieve a playlists id
          </span>
          {/* Step 1 */}
          <div className="flex flex-col gap-2">
            <span>
              <span className="font-barlow-semibold">Step 1:</span> Open
              playlist options
            </span>
            <img
              src="/images/idStepOne.png"
              alt="A playlist page with an arrow pointing at the 3 dots, indicating the options dropdown."
            />
          </div>
          {/* Step 2 */}
          <div className="flex flex-col gap-2">
            <span>
              <span className="font-barlow-semibold">Step 2:</span> Copy link to
              playlist under share options
            </span>
            <img
              src="/images/idStepTwo.png"
              alt="A playlist page with an arrow pointing at the Copy link to playlist button, which appears after hovering the share option in the playlist options dropdown."
            />
          </div>
          {/* Step 3 */}
          <div className="flex flex-col gap-2">
            <span>
              <span className="font-barlow-semibold">Step 3:</span> Retrieve the
              playlist ID from the copied link
            </span>
            <img
              src="/images/idStepThree.png"
              alt="A link to a spotify playlist. The last part of the link is highlighted, indicating that the last part of the link (after any slashes or colons) is the ID of the playlist"
            />
          </div>
        </div>
      </div>
    </Popup>
  );
}
