import clsx from "clsx";

export default function Cta({
  isLink = false,
  href = "/",
  children,
  smallerText = true,
  onClick = null,
  passedRef = null,
}) {
  if (isLink && href) {
    return (
      <a
        href={href}
        className={clsx(
          "border inline-block rounded-3xl border-orange px-3 py-2 font-barlow-semibold transition-all hover:bg-orange hover:text-white lg:px-6",
          smallerText ? "text-body-4" : "text-body-2"
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
        "border inline-block rounded-3xl border-orange px-3 py-2 font-barlow-semibold transition-all hover:bg-orange hover:text-white lg:px-6",
        smallerText ? "text-body-4" : "text-body-2"
      )}
      onClick={onClick}
      ref={passedRef}
    >
      {children}
    </button>
  );
}
