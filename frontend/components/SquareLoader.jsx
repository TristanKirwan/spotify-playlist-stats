import anime from "animejs";
import { useEffect, useRef } from "react";

export default function SquareLoader() {
  const loader = useRef(null);
  useEffect(() => {
    if (!loader?.current) return;

    anime({
      targets: loader.current.childNodes,
      scale: [1, 0.9, 1.1, 1],
      autoplay: true,
      loop: true,
      easing: "spring(1, 80, 10, 0)",
      delay: anime.stagger(150, { grid: [4, 4] }),
      duration: 800,
    });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-0.5" ref={loader}>
      <span className="inline-block origin-center w-3 h-3 bg-orange" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-2" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-3" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-4" />

      <span className="inline-block origin-center w-3 h-3 bg-orange/90" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-2/90" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-3/90" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-4/90" />

      <span className="inline-block origin-center w-3 h-3 bg-orange/80" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-2/80" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-3/80" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-4/80" />

      <span className="inline-block origin-center w-3 h-3 bg-orange/70" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-2/70" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-3/70" />
      <span className="inline-block origin-center w-3 h-3 bg-orange-4/70" />
    </div>
  );
}
