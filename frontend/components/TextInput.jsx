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
        "bg-transparent border-b-2 border-secondary/60 transition-colors outline-0 focus:border-secondary",
        className && className
      )}
      ref={passedRef}
    />
  );
}
