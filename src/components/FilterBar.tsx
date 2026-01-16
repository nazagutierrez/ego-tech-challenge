import OrderBy from "./filters/OrderBy";
import Filters from "./filters/Filters";

interface FilterBarProps {
  loading?: boolean;
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function FilterBar({
  loading,
  tags,
  selectedTags,
  setSelectedTags,
  sortBy,
  setSortBy,
}: FilterBarProps) {
  return (
    <div className="border-b border-border pt-6 pb-2">
      <div className="flex flex-col xl:flex-row gap-y-2 gap-x-4 justify-center items-center md:items-start sm:justify-between">
        {/* Filtrar para web y mobile */}
        <Filters
          loading={loading}
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        {/* Ordenar para web y mobile*/}
        <OrderBy sortBy={sortBy} setSortBy={setSortBy} />
      </div>
    </div>
  );
}
