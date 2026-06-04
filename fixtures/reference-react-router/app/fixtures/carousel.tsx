import { cn } from "../lib/utils"

const slides = ["One", "Two", "Three", "Four", "Five"]

function ReferenceCarousel({
  className,
  defaultIndex = 0,
  orientation = "horizontal",
}: {
  className?: string
  defaultIndex?: number
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      aria-label="Featured slides"
      aria-roledescription="carousel"
      className={cn("reference-carousel", orientation === "vertical" && "reference-carousel--vertical", className)}
      data-index={defaultIndex}
      data-orientation={orientation}
      role="region"
    >
      <div className="reference-carousel-content">
        <div className="reference-carousel-track" style={orientation === "horizontal" ? { transform: `translateX(-${defaultIndex * 100}%)` } : { transform: `translateY(-${defaultIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              aria-roledescription="slide"
              className="reference-carousel-item"
              data-selected={index === defaultIndex ? "true" : "false"}
              key={slide}
              role="group"
            >
              <div className="reference-carousel-slide-card">{slide}</div>
            </div>
          ))}
        </div>
      </div>
      <button aria-label="Previous slide" className="reference-carousel-previous" disabled={defaultIndex === 0}>‹</button>
      <button aria-label="Next slide" className="reference-carousel-next" disabled={defaultIndex === slides.length - 1}>›</button>
    </div>
  )
}

export function renderCarouselFixture(id: string) {
  switch (id) {
    case "initial-slide":
      return <ReferenceCarousel defaultIndex={2} />
    case "vertical":
      return <ReferenceCarousel orientation="vertical" />
    case "multiple-visible":
      return <ReferenceCarousel className="reference-carousel--multiple" />
    case "spacing":
      return <ReferenceCarousel className="reference-carousel--spacing" />
    case "keyboard":
      return <ReferenceCarousel defaultIndex={1} />
    case "custom-token":
      return <ReferenceCarousel className="reference-fixture-custom-carousel" defaultIndex={1} />
    default:
      return <ReferenceCarousel />
  }
}
