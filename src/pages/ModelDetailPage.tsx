import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { useParams } from "react-router-dom"
import type { CarModel } from "../types"
import FeatureCarousel from "../components/FeatureCarousel"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ModelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [model, setModel] = useState<CarModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

useLayoutEffect(() => {
  if (loading || !pageRef.current) return

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.from(imageRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
    })
    .from(
      Array.from(textRef.current!.children),
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.4"
    )
  }, pageRef)

  return () => ctx.revert()
}, [loading])


  useLayoutEffect(() => {
    if (loading) return

    gsap.from(".feature-carousel", {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: "power3.out",
    })
  }, [loading])

  useLayoutEffect(() => {
    if (loading) return

    gsap.utils.toArray<HTMLElement>(".highlight-block").forEach((block, i) => {
      const direction = i % 2 === 0 ? -60 : 60

      gsap.from(block, {
        opacity: 0,
        x: direction,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
        },
      })
    })
  }, [loading])

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
      console.log(err)    
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={pageRef} className="pb-6">
      <div className="mx-auto px-4 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="order-1">
            {!imagesLoaded && (
              <div className="bg-skeleton animate-pulse rounded w-full aspect-4/3 h-auto "></div>
            )}
            <img 
              onLoad={() => setImagesLoaded(true)} 
              src={model?.photo} alt={model?.name} 
              className={`aspect-video w-full h-auto object-cover ${imagesLoaded ? "block" : "hidden"}`} 
            />
          </div>
          <div ref={textRef} className="order-2">
            {
              loading ? 
                <div className="flex w-full gap-y-6 mt-4 justify-center items-start flex-col">
                  <div className="bg-skeleton animate-pulse rounded w-16 h-5"></div>
                  <div className="bg-skeleton animate-pulse rounded w-3/4 h-28"></div>
                  <div className="bg-skeleton animate-pulse rounded w-40 h-4"></div>
                </div>
              :
              <>
                <p className="text-xl font-medium mb-2">{model?.name}</p>
                <h1 className="text-4xl md:text-5xl text-title text-balance font-semibold text-foreground mb-6 leading-tight">{model?.title}</h1>
                <div
                  className="text-foreground/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: model?.description || "" }}
                />
              </>
            }
          </div>
        </div>
      </div>

      <div className="mt-12 feature-carousel">
        <FeatureCarousel loading={loading} features={model?.model_features} />
      </div>

      {model?.model_highlights && model?.model_highlights.length > 0 && (
        <div className="container mx-auto lg:px-8 pt-16">
          {model?.model_highlights.map((highlight, index) => (
            <div
              key={index}
              className={`grid highlight-block grid-cols-1 gap-12 items-center mb-14 md:mb-24`}
            >
              {index % 2 === 0 ? (
                <div className="flex md:flex-row flex-col-reverse items-center justify-center gap-6 md:gap-12 mx-5">
                  <div className="w-full md:w-1/2">
                    <h2 className="text-xl font-semibold text-foreground mb-4">{highlight.title}</h2>
                    <div
                      className="text-foreground/80 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: highlight.content || "" }}
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg w-full md:w-1/2">
                    <img
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      className="w-full aspect-5/3 h-auto object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex md:flex-row flex-col items-center justify-center gap-12 mx-5">
                  <div className="overflow-hidden rounded-lg w-full md:w-1/2">
                    <img
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      className="w-full aspect-5/3 h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h2 className="text-xl font-semibold text-foreground mb-4">{highlight.title}</h2>
                    <div
                      className="text-foreground/80 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: highlight.content || "" }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
