import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

interface FilterBarProps {
  loading?: boolean;
  segments: string[];
  selectedSegments: string[];
  onSegmentChange: (segments: string[]) => void;
}

export default function Filters({
  loading,
  segments,
  selectedSegments,
  onSegmentChange,
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement | null>(null);
  const filterListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!filterListRef.current) return;

    if (isFilterOpen) {
      gsap.fromTo(
        filterListRef.current,
        { height: 0, opacity: 0, y: -8 },
        { height: "auto", opacity: 1, y: 0, duration: 0.3, ease: "power2.out", pointerEvents: "auto" }
      );
    } else {
      gsap.to(filterListRef.current, {
        height: 0,
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [isFilterOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(target)
      ) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSegment = (segment: string) => {
    if (segment === "Todos") {
      onSegmentChange([]);
    } else {
      if (selectedSegments.includes(segment)) {
        onSegmentChange(selectedSegments.filter((s) => s !== segment));
      } else {
        onSegmentChange([...selectedSegments, segment]);
      }
    }
  };

  const isAllSelected = selectedSegments.length === 0;

  const filterLabel =
    selectedSegments.length === 0
      ? "Todos"
      : selectedSegments.length === 1
      ? selectedSegments[0]
      : `${selectedSegments.length} seleccionados`;

  return (
    <>
      <div className="hidden md:flex items-center gap-4 flex-wrap">
        
        {/* Filtros para web */}
        <span className="text-sm font-semibold text-foreground">
          Filtrar por
        </span>
        <button
          onClick={() => toggleSegment("Todos")}
          className={`px-4 py-1.5 rounded-full cursor-pointer text-sm hover:bg-muted-hover transition-colors ${
            isAllSelected ? "bg-muted" : ""
          }`}
        >
          Todos
        </button>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-8 w-20 bg-skeleton rounded-full animate-pulse"
              ></div>
            ))
          : segments.map((segment) => (
              <button
                key={segment}
                onClick={() => toggleSegment(segment)}
                className={`px-4 py-1.5 rounded-full cursor-pointer text-sm hover:bg-muted-hover transition-colors ${
                  selectedSegments.includes(segment) ? "bg-muted" : ""
                }`}
              >
                {segment}
              </button>
            ))}
      </div>

      {/* Filtros para mobile */}
      <div className="flex md:hidden flex-wrap items-center justify-center gap-2">
        <label className="w-22 text-center text-sm font-medium text-foreground whitespace-nowrap">
          Filtrar por
        </label>

        <div ref={filterDropdownRef} className="relative w-56">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex justify-between items-center px-3 py-2 text-sm bg-muted hover:bg-muted-hover rounded-md"
          >
            {filterLabel}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <ul
            ref={filterListRef}
            style={{ height: 0, opacity: 0, pointerEvents: "none" }}
            className="absolute overflow-hidden z-10 mt-1 w-full bg-white rounded-md divide-y divide-border shadow-[0_10px_35px_0_rgba(0,0,0,0.25)]"
          >
            <li
              onClick={() => toggleSegment("Todos")}
              className={`
                  px-3 py-2 text-sm cursor-pointer
                  hover:bg-muted
                  ${selectedSegments.length === 0 ? "bg-muted font-medium" : ""}
                `}
            >
              Todos
            </li>

            {segments.map((segment) => {
              const isSelected = selectedSegments.includes(segment);

              return (
                <li
                  key={segment}
                  onClick={() => toggleSegment(segment)}
                  className={`
                      px-3 py-2 text-sm cursor-pointer
                      hover:bg-muted flex justify-between items-center
                      ${isSelected ? "bg-muted font-medium" : ""}
                    `}
                >
                  {segment}
                  {isSelected && <span>✓</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
