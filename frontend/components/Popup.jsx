import clsx from "clsx";
import { useEffect } from "react";
import toggleBodyScrolling from "../utils/toggleBodyScrolling";
import Icon from "./Icon/Icon";

export default function Popup({ isOpen, closeCallback, children }) {
  useEffect(() => {
    toggleBodyScrolling();
  }, []);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 flex items-center justify-center w-full h-screen p-8 transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-text/20"></div>
      <div className="relative min-w-xs max-w-xl px-8 pt-8 pb-4 bg-background md:min-w-sm">
        <button
          onClick={closeCallback}
          aria-label="Close popup"
          className="absolute top-2 right-2"
        >
          <Icon type="close" className="w-6 h-6 aspect-square" />
        </button>
        {children}
      </div>
    </div>
  );
}
