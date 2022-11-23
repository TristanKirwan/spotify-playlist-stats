import clsx from "clsx";

export default function Cta({
  isLink = false,
  href = "/",
  children,
  onClick = null,
  passedRef = null,
  disabled = false,
  className,
}) {
  if (isLink && href) {
    return (
      <a
        href={href}
        className={clsx(
          "border inline-block rounded border-secondary bg-secondary px-2 py-0.5 font-barlow-semibold text-background transition-all hover:bg-secondary/80 hover:border-secondary/80 lg:px-6 text-body-3",
          className
        )}
        ref={passedRef}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={clsx(
        "border inline-block roundedpx-2 px-2 py-0.5font-barlow-semibold text-background transition-all lg:px-6 text-body-3",
        disabled
          ? "bg-secondary/80 border-secondary/80 cursor-not-allowed"
          : "bg-secondary border-secondary  hover:bg-secondary/80 hover:border-secondary/80",
        className
      )}
      onClick={onClick}
      ref={passedRef}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
