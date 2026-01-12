import { Link } from "react-router-dom"
import type { CarModel } from "../types"
import { formatPrice } from "../utils/formatters"
import { ArrowUpRight } from 'lucide-react';

interface ModelCardProps {
  model: CarModel
}

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <Link to={`/modelo/${model.id}`} className="group h-fit">
      <div className="relative overflow-hidden bg-card">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold group-hover:text-accent transition-colors mb-2">{model.name}</h3>
          <p className="text-sm text-muted-foreground">
            {model.year} | {formatPrice(model.price)}
          </p>
        </div>
        <div className="aspect-video sm:aspect-4/3 relative">
          <img
            src={model.photo || "/placeholder.svg"}
            alt={model.name}
            className="
              w-full h-full
              object-cover sm:object-contain
              object-center
              transition-transform duration-300
              group-hover:scale-105
            "
          />
        </div>
        <div className="hidden sm:flex mb-4 justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-300">
          <Link to={`/modelo/${model.id}`} className="animated-button px-6 py-3 bg-primary-black text-primary-foreground rounded-full text-sm font-medium hover:bg-primary-black/90 transition-colors">
            <span className="text">Ver modelo</span><span className="flex gap-x-1 items-center justify-center"><ArrowUpRight size={17} />Ir</span>
          </Link>
        </div>
      </div>
    </Link>
  )
}
