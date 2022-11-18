import { useFetcher } from "@remix-run/react";
import { useRef } from "react";
import CTA from "./Cta";
import Popup from "./Popup";
import TextInput from "./TextInput";

export default function PlaylistPopup({ isOpen, closeCallBack }) {
  const fetcher = useFetcher();
  const textInputRef = useRef(null);

  return (
    <Popup isOpen={isOpen} closeCallback={closeCallBack}>
      <fetcher.Form
        method="POST"
        action="/actions/getPlaylistInfo"
        encType="multipart/formdata"
        className="flex flex-col gap-12 justify-start max-w-[400px]"
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
            <span className="block mb-2">
              Something went wrong retrieving the playlist data. Please try
              again later.
            </span>
          )}
          <CTA isLink={false}>Get data</CTA>
        </div>
      </fetcher.Form>
    </Popup>
  );
}
