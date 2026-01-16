import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDropdownAnimation } from "../../hooks/useDropdownAnimation";
import { useClickOutside } from "../../hooks/useClickOutside";

interface FilterBarProps {
  loading?: boolean;
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export default function Filters({
  loading,
  tags,
  selectedTags,
  setSelectedTags,
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const filterListRef = useRef<HTMLUListElement>(null);

  useDropdownAnimation(filterListRef, isFilterOpen);
  useClickOutside(filterDropdownRef, () => setIsFilterOpen(false));

  const toggleTag = (tag: string) => {
    if (tag === "Todos") {
      setSelectedTags([]);
    } else {
      setSelectedTags(
        selectedTags.includes(tag)
          ? selectedTags.filter((s) => s !== tag)
          : [...selectedTags, tag]
      );
    }
  };

  const isAllSelected = selectedTags.length === 0;
  const filterLabel =
    selectedTags.length === 0
      ? "Todos"
      : selectedTags.length === 1
      ? selectedTags[0]
      : `${selectedTags.length} seleccionados`;

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="h-8 w-20 bg-skeleton rounded-full animate-pulse" />
    ));

  return (
    <>
      {/* Filtros para web */}
      <div className="hidden md:flex items-center gap-4 flex-wrap">
        <span className="text-sm font-semibold text-foreground">Filtrar por</span>
        <button
          onClick={() => toggleTag("Todos")}
          className={`px-4 py-1.5 rounded-full cursor-pointer text-sm hover:bg-muted-hover transition-colors ${
            isAllSelected ? "bg-muted" : ""
          }`}
        >
          Todos
        </button>
        {loading ? renderSkeletons() : tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-1.5 rounded-full cursor-pointer text-sm hover:bg-muted-hover transition-colors ${
              selectedTags.includes(tag) ? "bg-muted" : ""
            }`}
          >
            {tag}
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
            <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
          </button>

          <ul
            ref={filterListRef}
            style={{ height: 0, opacity: 0, pointerEvents: "none" }}
            className="absolute overflow-hidden z-10 mt-1 w-full bg-white rounded-md divide-y divide-border shadow-[0_10px_35px_0_rgba(0,0,0,0.25)]"
          >
            <li
              onClick={() => toggleTag("Todos")}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted ${
                isAllSelected ? "bg-muted font-medium" : ""
              }`}
            >
              Todos
            </li>
            {tags.map((tag) => (
              <li
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted flex justify-between items-center ${
                  selectedTags.includes(tag) ? "bg-muted font-medium" : ""
                }`}
              >
                {tag}
                {selectedTags.includes(tag) && <span>✓</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
