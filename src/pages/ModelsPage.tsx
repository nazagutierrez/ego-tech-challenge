import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react"
import type { CarModel } from "../types"
import ModelCard from "../components/ModelCard"
import FilterBar from "../components/FilterBar"
import gsap from "gsap"

export default function ModelsPage() {
  const [models, setModels] = useState<CarModel[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("")

  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://challenge.egodesign.dev/api/models/")
      if (!response.ok) {
        throw new Error("Failed to fetch models")
      }
      const data = await response.json()
      setModels(data)
    } catch (err) { console.log(err) } finally {
      setLoading(false)
    }
  }

  const tags = useMemo(() => {
    const uniqueTags = Array.from(new Set(models.map((m) => m.segment)))
    return uniqueTags.sort()
  }, [models])

  const SORT_FUNCTIONS: Record<string, (a: CarModel, b: CarModel) => number> = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "year-newest": (a, b) => b.year - a.year,
    "year-oldest": (a, b) => a.year - b.year,
  };

  const filteredAndSortedModels = useMemo(() => {
    let filtered = selectedTags.length > 0
      ? models.filter((model) => selectedTags.includes(model.segment))
      : models;

    if (!sortBy || !SORT_FUNCTIONS[sortBy]) return filtered;
    
    return [...filtered].sort(SORT_FUNCTIONS[sortBy]);
  }, [models, selectedTags, sortBy])

  useLayoutEffect(() => {
    if (!gridRef.current || loading) return

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.children

      gsap.set(cards, { opacity: 1, y: 0, scale: 1 })

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          clearProps: "all",
        }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [filteredAndSortedModels, loading])
  

  return (
    <div className="mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl text-title lg:text-5xl font-bold mb-8 mt-5">Descubrí todos los modelos</h1>

      <FilterBar
        loading={loading}
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="h-full">
        <div ref={gridRef} className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-y-2 gap-x-10 mt-12">
          {
            loading ? 
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex w-full mb-10 sm:mb-24 gap-y-2 justify-center items-center flex-col"
                >
                  <div className="bg-skeleton animate-pulse rounded w-28 h-7"></div>
                  <div className="bg-skeleton animate-pulse rounded w-40 h-4"></div>
                  <div className="bg-skeleton animate-pulse rounded w-full max-w-[338px] h-[254.5px]"></div>
                </div>
              ))
            :
            filteredAndSortedModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))
          }
        </div>
      </div>

      {filteredAndSortedModels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron modelos con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  )
}
