"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from 'lucide-react';

interface FilterBarProps {
  loading?: boolean
  segments: string[]
  selectedSegments: string[]
  onSegmentChange: (segments: string[]) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export default function FilterBar({
  loading,
  segments,
  selectedSegments,
  onSegmentChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const filterDropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false)
      }

      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(target)
      ) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleSegment = (segment: string) => {
    if (segment === "Todos") {
      onSegmentChange([])
    } else {
      if (selectedSegments.includes(segment)) {
        onSegmentChange(selectedSegments.filter((s) => s !== segment))
      } else {
        onSegmentChange([...selectedSegments, segment])
      }
    }
  }

  const options = [
    { value: "", label: "Nada" },
    { value: "price-asc", label: "De menor a mayor precio" },
    { value: "price-desc", label: "De mayor a menor precio" },
    { value: "year-newest", label: "Más nuevos primero" },
    { value: "year-oldest", label: "Más viejos primero" },
  ];

  const isAllSelected = selectedSegments.length === 0

  const filterLabel =
    selectedSegments.length === 0
      ? "Todos"
      : selectedSegments.length === 1
      ? selectedSegments[0]
      : `${selectedSegments.length} seleccionados`

  return (
    <div className="border-b border-border pt-6 pb-2">
      <div className="flex flex-col xl:flex-row gap-y-2 gap-x-4 justify-center items-center md:items-start sm:justify-between">
        {/* Filtrar para web */}
        <div className="hidden md:flex items-center gap-4 flex-wrap">
          <span className="text-sm font-semibold text-foreground">Filtrar por</span>
          <button
            onClick={() => toggleSegment("Todos")}
            className={`px-4 py-1.5 rounded-full text-sm hover:bg-muted-hover transition-colors ${
              isAllSelected ? "bg-muted" : ""
            }`}
          >
            Todos
          </button>
          {
            loading ? 
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-8 w-20 bg-[#e4e4e4] rounded-full animate-pulse"
              ></div>
            ))
            :
            segments.map((segment) => (
              <button
                key={segment}
                onClick={() => toggleSegment(segment)}
                className={`px-4 py-1.5 rounded-full text-sm hover:bg-muted-hover transition-colors ${
                  selectedSegments.includes(segment)
                    ? "bg-muted"
                    : ""
                }`}
              >
                {segment}
              </button>
            ))
          }
        </div>

        {/* Filtrar para mobile */}
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

            {isFilterOpen && (
              <ul className="absolute overflow-hidden z-10 mt-1 w-full bg-white rounded-md divide-y divide-border shadow-[0_10px_35px_0_rgba(0,0,0,0.25)]">
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

                {segments.map(segment => {
                  const isSelected = selectedSegments.includes(segment)

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
                  )
                })}
              </ul>
            )}
          </div>
        </div>


        {/* Ordenar para web y mobile*/}
        <div className="flex items-center justify-center flex-wrap gap-2">
          <label htmlFor="sort" className="w-22 text-sm font-medium text-foreground whitespace-nowrap">
            Ordenar por
          </label>
          <div ref={dropdownRef} className="relative w-56">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex justify-between cursor-pointer items-center px-3 py-2 text-sm bg-muted hover:bg-muted-hover rounded-md"
            >
              {options.find(o => o.value === sortBy)?.label || "Seleccionar"}
              <span><ChevronDown className={`${isOpen ? "rotate-180" : ""} h-4 w-4 transition-transform`} /></span>
            </button>

            {isOpen && (
              <ul className="absolute overflow-hidden divide-y divide-border z-10 mt-1 w-full bg-white rounded-md shadow-[0_10px_35px_0_rgba(0,0,0,0.25)]">
                {options.map(opt => {
                  const isSelected = opt.value === sortBy

                  return (
                    <li
                      key={opt.value}
                      onClick={() => {
                        onSortChange(opt.value)
                        setIsOpen(false)
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
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
