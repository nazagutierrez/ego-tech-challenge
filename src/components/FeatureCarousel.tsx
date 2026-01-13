import type { ModelFeature } from "../types";
import { useRef, useState } from "react";

import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface FeatureCarouselProps {
  features?: ModelFeature[];
  loading: boolean;
}

function FeatureCard({ feature }: { feature: ModelFeature }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="overflow-hidden">
      <div className="relative w-full aspect-video rounded-lg">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-skeleton animate-pulse rounded-lg" />
        )}

        <img
          src={feature.image || "/placeholder.svg"}
          alt={feature.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`
            absolute inset-0
            w-full h-full
            object-cover rounded
            transition-opacity duration-300
            ${imageLoaded ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>

      <div className="pt-4">
        <h3 className="font-semibold text-lg md:text-xl text-foreground mb-2 truncate">
          {feature.name}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

function FeatureSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-video bg-skeleton rounded-lg mb-4" />
      <div className="h-5 bg-skeleton rounded mb-2" />
      <div className="h-4 bg-skeleton rounded w-3/4" />
    </div>
  );
}

export default function FeatureCarousel({
  features,
  loading,
}: FeatureCarouselProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="relative pt-8 pb-4 mt-10 bg-muted">
      <div className="px-2 sm:px-4 sm:mx-6 md:mx-12 lg:px-8 relative">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <FeatureSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <button
              ref={prevRef}
              aria-label="Previous slide"
              className="
                absolute -left-8 top-[30%] z-10 -translate-y-1/2
                hidden md:flex
                h-10 w-10 items-center justify-center
                rounded-full bg-white shadow-xl
                group cursor-pointer hover:bg-[#e4e4e4]
                transition-colors duration-200
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              ref={nextRef}
              aria-label="Next slide"
              className="
                absolute -right-8 top-[30%] z-10 -translate-y-1/2
                hidden md:flex
                h-10 w-10 items-center justify-center
                rounded-full bg-white shadow-xl
                group cursor-pointer hover:bg-[#e4e4e4]
                transition-colors duration-200
              "
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <Swiper
              modules={[Navigation, Pagination, A11y]}
              pagination={{
                clickable: true,
                renderBullet: (_index, className) => {
                  return `
                    <button class="${className} custom-bullet">
                      <span></span>
                    </button>
                  `;
                },
              }}
              onBeforeInit={(swiper) => {
                // @ts-expect-error Swiper typing
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-expect-error Swiper typing
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
            >
              {features?.map((feature) => (
                <SwiperSlide key={`${feature.name}-1`} className="pb-8">
                  <FeatureCard feature={feature} />
                </SwiperSlide>
              ))}

              {/* Solo para que haya mas items */}
              {features?.map((feature) => (
                <SwiperSlide key={`${feature.name}-2`} className="pb-8">
                  <FeatureCard feature={feature} />
                </SwiperSlide>
              ))}
              {features?.map((feature) => (
                <SwiperSlide key={`${feature.name}-2`} className="pb-8">
                  <FeatureCard feature={feature} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      
      </div>
    </section>
  );
}