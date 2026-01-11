"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import type { CarModel } from "../types"
import { formatPrice } from "../utils/formatters"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"
import FeatureCarousel from "../components/FeatureCarousel"

export default function ModelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [model, setModel] = useState<CarModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  console.log(model)

  useEffect(() => {
    if (id) {
      fetchModelDetail(id)
    }
  }, [id])

  const fetchModelDetail = async (modelId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`https://challenge.egodesign.dev/api/models/${modelId}/`)
      if (!response.ok) {
        throw new Error("Failed to fetch model details")
      }
      const data = await response.json()
      setModel(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!model) return <ErrorMessage message="Model not found" />

  return (
    <div className="pb-16">
      <div className="bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img src={model.photo || "/placeholder.svg"} alt={model.name} className="w-full h-auto object-contain" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm text-muted-foreground mb-2">{model.name}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">{model.title}</h1>
              <div
                className="text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: model.description }}
              />
              <div className="mt-6">
                <p className="text-2xl font-bold text-foreground">{formatPrice(model.price)}</p>
                <p className="text-sm text-muted-foreground mt-1">Año {model.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {model.model_features && model.model_features.length > 0 && <FeatureCarousel features={model.model_features} />}

      {model.model_highlights && model.model_highlights.length > 0 && (
        <div className="container mx-auto px-4 lg:px-8 py-16">
          {model.model_highlights.map((highlight, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 ${
                index % 2 === 0 ? "" : "lg:flex-row-reverse"
              }`}
            >
              {index % 2 === 0 ? (
                <>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">{highlight.title}</h2>
                    <p className="text-foreground/80 leading-relaxed">{highlight.content}</p>
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="overflow-hidden rounded-lg order-2 lg:order-1">
                    <img
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="order-1 lg:order-2">
                    <h2 className="text-3xl font-bold text-foreground mb-4">{highlight.title}</h2>
                    <p className="text-foreground/80 leading-relaxed">{highlight.content}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
