export default function toggleBodyScrolling(){
  if(!document) return;

  const body = document.querySelector('body');
  if(!body) return;

  return body.classList.toggle('overflow-hidden')
}