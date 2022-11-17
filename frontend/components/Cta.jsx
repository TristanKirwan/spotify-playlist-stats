import clsx from "clsx";

export default function Cta({
  isLink = false,
  href = "/",
  children,
  onClick = null,
  passedRef = null,
  className
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
        "border inline-block rounded border-secondary bg-secondary px-2 py-0.5 font-barlow-semibold text-background transition-all hover:bg-secondary/80 hover:border-secondary/80 lg:px-6 text-body-3",
        className
      )}
      onClick={onClick}
      ref={passedRef}
    >
      {children}
    </button>
  );
}
