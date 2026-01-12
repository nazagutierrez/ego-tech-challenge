import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;

    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      gsap.set(cursor, {
        x: pos.current.x,
        y: pos.current.y,
      });
    };

    gsap.ticker.add(tick);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] custom-cursor
                 h-5 w-5 rounded-full border border-accent
                 pointer-events-none
                 -translate-x-1/2 -translate-y-1/2"
    />
  );
}
