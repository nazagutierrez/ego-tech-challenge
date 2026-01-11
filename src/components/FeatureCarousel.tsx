"use client"

import { useState } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import type { ModelFeature } from "../types"

interface FeatureCarouselProps {
  features: ModelFeature[]
}

export default function FeatureCarousel({ features }: FeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3
  const maxIndex = Math.max(0, features.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  if (features.length === 0) return null

  return (
    <div className="relative py-8 bg-muted/30">
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
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex-shrink-0 px-3" style={{ width: `${100 / itemsPerView}%` }}>
                  <div className="bg-card rounded-lg overflow-hidden shadow-sm">
                    <div className="overflow-hidden">
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground mb-2 truncate">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
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
