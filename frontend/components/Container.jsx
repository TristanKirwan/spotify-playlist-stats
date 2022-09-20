import clsx from "clsx";

export default function Container({ children, containerClass }) {
  return (
    <div
      className={clsx("px-5 max-w-[760px] xl:max-w-[1120px]", containerClass)}
    >
      {children}
    </div>
  );
}
