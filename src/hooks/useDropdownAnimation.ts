import { useEffect, RefObject } from "react";
import gsap from "gsap";

export function useDropdownAnimation(
  listRef: RefObject<HTMLElement | null>,
  isOpen: boolean
) {
  useEffect(() => {
    if (!listRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        listRef.current,
        { height: 0, opacity: 0, y: -8 },
        {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          pointerEvents: "auto",
        }
      );
    } else {
      gsap.to(listRef.current, {
        height: 0,
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [isOpen, listRef]);
}
