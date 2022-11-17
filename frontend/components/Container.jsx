import clsx from "clsx";

export default function Container({ children, containerClass }) {
  return (
    <div
      className={clsx("px-5 mx-auto max-w-[1280px] md:px-8", containerClass)}
    >
      {children}
    </div>
  );
}
