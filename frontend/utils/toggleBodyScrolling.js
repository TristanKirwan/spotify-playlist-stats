export default function toggleBodyScrolling(enable) {
  if (!document) return;

  const body = document.querySelector("body");
  if (!body) return;

  if (enable) {
    return body.classList.add("overflow-hidden");
  }
  return body.classList.remove("overflow-hidden");
}
