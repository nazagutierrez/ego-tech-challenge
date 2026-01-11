export interface CarModel {
  id: number
  name: string
  segment: string
  year: number
  price: number
  thumbnail: string
  photo: string
  title: string
  description: string
  model_features: ModelFeature[]
  model_highlights: ModelHighlight[]
}

export interface ModelFeature {
  name: string
  description: string
  image: string
}

export interface ModelHighlight {
  title: string
  content: string
  image: string
}

export type SortOption = "price-asc" | "price-desc" | "year-newest" | "year-oldest"
