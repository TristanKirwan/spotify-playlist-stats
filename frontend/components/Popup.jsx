import anime from "animejs";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import toggleBodyScrolling from "../utils/toggleBodyScrolling";
import Icon from "./Icon/Icon";

export default function Popup({
  isOpen,
  closeCallback,
  allowScrolling,
  children,
  fetcher,
}) {
  const wrapperRef = useRef(null);
  const backgroundRef = useRef(null);
  const popupRef = useRef(null);

  const wasOpenBefore = useRef(false);

  useEffect(() => {
    toggleBodyScrolling(isOpen);
    if (isOpen) {
    }
  }, [isOpen]);

  useEffect(() => {
    if (!wrapperRef?.current || !backgroundRef?.current || !popupRef?.current)
      return;

    if (isOpen) {
      wasOpenBefore.current = true;
      anime
        .timeline({
          easing: "easeOutCubic",
          duration: 800,
        })
        .add({
          targets: wrapperRef.current,
          opacity: [0, 1],
          duration: 0,
        })
        .add({
          targets: backgroundRef.current,
          opacity: [0, 1],
        })
        .add(
          {
            targets: popupRef?.current,
            opacity: [0, 1],
            translateY: ["-2vh", "0rem"],
          },
          "-=400"
        );
    } else if (!isOpen && wasOpenBefore.current) {
      anime
        .timeline({
          easing: "easeOutCubic",
          duration: 800,
        })
        .add({
          targets: popupRef?.current,
          opacity: [1, 0],
          translateY: ["0rem", "-2vh"],
        })
        .add(
          {
            targets: backgroundRef.current,
            opacity: [1, 0],
          },
          "-=400"
        )
        .add({
          targets: wrapperRef.current,
          opacity: [1, 0],
          duration: 1,
        });
    }
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 flex items-center justify-center w-full h-screen p-8 z-20",
        !isOpen && "pointer-events-none"
      )}
      ref={wrapperRef}
    >
      <div
        className="absolute top-0 left-0 w-full h-full opacity-0 bg-text/20"
        ref={backgroundRef}
      ></div>
      <div
        className={clsx(
          "relative max-w-xl px-8 pt-8 pb-4 min-w-xs bg-background max-h-[75vh] md:min-w-sm opacity-0",
          allowScrolling && fetcher?.state !== "submitting"
            ? "overflow-auto"
            : "overflow-hidden"
        )}
        ref={popupRef}
      >
        <button
          onClick={closeCallback}
          aria-label="Close popup"
          className="absolute transition-transform rotate-0 top-2 right-2 hover:rotate-90"
        >
          <Icon type="cross" className="w-6 h-6 aspect-square" />
        </button>
        {children}
      </div>
    </div>
  );
}
