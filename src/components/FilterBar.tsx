import OrderBy from "./filters/OrderBy";
import Filters from "./filters/Filters";

interface FilterBarProps {
  loading?: boolean;
  segments: string[];
  selectedSegments: string[];
  onSegmentChange: (segments: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({
  loading,
  segments,
  selectedSegments,
  onSegmentChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="border-b border-border pt-6 pb-2">
      <div className="flex flex-col xl:flex-row gap-y-2 gap-x-4 justify-center items-center md:items-start sm:justify-between">
        {/* Filtrar para web y mobile */}
        <Filters
          loading={loading}
          segments={segments}
          selectedSegments={selectedSegments}
          onSegmentChange={onSegmentChange}
        />

        {/* Ordenar para web y mobile*/}
        <OrderBy sortBy={sortBy} onSortChange={onSortChange} />
      </div>
    </div>
  );
}
