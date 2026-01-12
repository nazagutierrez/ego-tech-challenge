"use client"

import { useState, useEffect, useMemo } from "react"
import type { CarModel, SortOption } from "../types"
import ModelCard from "../components/ModelCard"
import FilterBar from "../components/FilterBar"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"

export default function ModelsPage() {
  const [models, setModels] = useState<CarModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSegments, setSelectedSegments] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<string>("")

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const segments = useMemo(() => {
    const uniqueSegments = Array.from(new Set(models.map((m) => m.segment)))
    return uniqueSegments.sort()
  }, [models])

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(models.map((m) => m.year)))
    return uniqueYears.sort((a, b) => b - a)
  }, [models])

  const filteredAndSortedModels = useMemo(() => {
    let filtered = models

    if (selectedSegments.length > 0) {
      filtered = filtered.filter((model) => selectedSegments.includes(model.segment))
    }

    if (selectedYears.length > 0) {
      filtered = filtered.filter((model) => selectedYears.includes(model.year))
    }

    const sorted = [...filtered]
    switch (sortBy as SortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "year-newest":
        sorted.sort((a, b) => b.year - a.year)
        break
      case "year-oldest":
        sorted.sort((a, b) => a.year - b.year)
        break
    }

    return sorted
  }, [models, selectedSegments, selectedYears, sortBy])

  if (error) return <ErrorMessage message={error} />


  return (
    <div className="mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl text-title lg:text-5xl font-bold mb-8 mt-5">Descubrí todos los modelos</h1>

      <FilterBar
        loading={loading}
        segments={segments}
        selectedSegments={selectedSegments}
        onSegmentChange={setSelectedSegments}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="h-screen">
        <div className="grid h-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-y-6 gap-x-10 mt-12">
          {
            loading ? 
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex w-full gap-y-2 justify-center items-center flex-col"
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
