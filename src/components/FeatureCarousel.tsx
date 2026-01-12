"use client"

import { useState } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import type { ModelFeature } from "../types"

interface FeatureCarouselProps {
  features?: ModelFeature[]
  loading: boolean
}

export default function FeatureCarousel({ features, loading }: FeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3
  const maxIndex = Math.max(0, (features?.length || 0) - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <div className="relative py-8 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            aria-label="Previous"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>

          <div className="overflow-hidden mx-12">
            <div
              className="flex justify-center transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {
                loading ? 
                  Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="flex-shrink-0 px-3 mt-3 mb-2.5" style={{ width: `${100 / itemsPerView}%` }}> 
                      <div className="animate-pulse">
                        <div className="h-[241.47px] bg-[#e4e4e4] rounded-lg mb-4"></div>
                        <div className="h-6 bg-[#e4e4e4] rounded mb-2"></div>
                        <div className="h-4 bg-[#e4e4e4] rounded"></div>
                      </div>
                    </div>
                  ))
                :
                features?.map((feature, index) => (
                  <div key={index} className="flex-shrink-0 px-3" style={{ width: `${100 / itemsPerView}%` }}>
                    <div className=" overflow-hidden">
                      <div className="overflow-hidden">
                        <img
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.name}
                          className="w-full rounded-lg h-full object-cover"
                        />
                      </div>
                      <div className="py-4">
                        <h3 className="font-bold text-foreground mb-2 truncate">{feature.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            aria-label="Next"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
