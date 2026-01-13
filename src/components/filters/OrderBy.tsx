import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

interface FilterBarProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function OrderBy({ sortBy, onSortChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const sortListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!sortListRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        sortListRef.current,
        { height: 0, opacity: 0, y: -8 },
        { height: "auto", opacity: 1, y: 0, duration: 0.3, ease: "power2.out", pointerEvents: "auto" }
      );
    } else {
      gsap.to(sortListRef.current, {
        height: 0,
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) { setIsOpen(false); }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  const options = [
    { value: "", label: "Nada" },
    { value: "price-asc", label: "De menor a mayor precio" },
    { value: "price-desc", label: "De mayor a menor precio" },
    { value: "year-newest", label: "Más nuevos primero" },
    { value: "year-oldest", label: "Más viejos primero" },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-2">

      <label
        htmlFor="sort"
        className="w-22 text-sm font-medium text-foreground whitespace-nowrap"
      >
        Ordenar por
      </label>

      <div ref={dropdownRef} className="relative w-56">

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between cursor-pointer items-center px-3 py-2 text-sm bg-muted hover:bg-muted-hover rounded-md"
        >
          {options.find((o) => o.value === sortBy)?.label || "Seleccionar"}
          <span>
            <ChevronDown
              className={`${
                isOpen ? "rotate-180" : ""
              } h-4 w-4 transition-transform`}
            />
          </span>
        </button>

        <ul
          ref={sortListRef}
          style={{ height: 0, opacity: 0, pointerEvents: "none" }}
          className="absolute overflow-hidden divide-y divide-border z-10 mt-1 w-full bg-white rounded-md shadow-[0_10px_35px_0_rgba(0,0,0,0.25)]"
        >
          {options.map((opt) => {
            const isSelected = opt.value === sortBy;

            return (
              <li
                key={opt.value}
                onClick={() => {
                  onSortChange(opt.value);
                  setIsOpen(false);
                }}
                className={`
                      px-3 py-2 text-sm cursor-pointer
                      transition-colors
                      hover:bg-muted
                      ${isSelected ? "bg-muted font-medium" : ""}
                    `}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
