import clsx from "clsx";

export default function TextInput({
  name = "",
  required = true,
  placeholder = "",
  className = "",
  passedRef,
}) {
  return (
    <input
      type="text"
      name={name}
      required={required}
      placeholder={placeholder}
      className={clsx(
        "px-4 py-2 text-white font-barlow-semibold bg-green placeholder:text-white/80",
        className && className
      )}
      ref={passedRef}
    />
  );
}
