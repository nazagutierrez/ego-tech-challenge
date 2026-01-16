import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDropdownAnimation } from "../../hooks/useDropdownAnimation";
import { useClickOutside } from "../../hooks/useClickOutside";

interface FilterBarProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const SORT_OPTIONS = [
  { value: "", label: "Nada" },
  { value: "price-asc", label: "De menor a mayor precio" },
  { value: "price-desc", label: "De mayor a menor precio" },
  { value: "year-newest", label: "Más nuevos primero" },
  { value: "year-oldest", label: "Más viejos primero" },
];

export default function OrderBy({ sortBy, setSortBy }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sortListRef = useRef<HTMLUListElement>(null);

  useDropdownAnimation(sortListRef, isOpen);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      <label htmlFor="sort" className="w-22 text-sm font-medium text-foreground whitespace-nowrap">
        Ordenar por
      </label>

      <div ref={dropdownRef} className="relative w-56">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between cursor-pointer items-center px-3 py-2 text-sm bg-muted hover:bg-muted-hover rounded-md"
        >
          {SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "Seleccionar"}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <ul
          ref={sortListRef}
          style={{ height: 0, opacity: 0, pointerEvents: "none" }}
          className="absolute overflow-hidden divide-y divide-border z-10 mt-1 w-full bg-white rounded-md shadow-[0_10px_35px_0_rgba(0,0,0,0.25)]"
        >
          {SORT_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                setSortBy(opt.value);
                setIsOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors hover:bg-muted ${
                opt.value === sortBy ? "bg-muted font-medium" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
