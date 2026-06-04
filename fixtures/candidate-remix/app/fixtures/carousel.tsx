import type { FixtureScenario } from '../../../scenarios/types.ts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'radcn'

const slides = ['One', 'Two', 'Three', 'Four', 'Five']

function SlideCard({ label }: { label: string }) {
  return <div class="radcn-carousel-slide-card">{label}</div>
}

function CandidateCarousel({
  className,
  defaultIndex = 0,
  orientation = 'horizontal',
}: {
  className?: string
  defaultIndex?: number
  orientation?: 'horizontal' | 'vertical'
}) {
  return (
    <Carousel ariaLabel="Featured slides" class={className} defaultIndex={defaultIndex} orientation={orientation}>
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem ariaLabel={`Slide ${index + 1} of ${slides.length}`} index={index} selected={index === defaultIndex}>
            {SlideCard({ label: slide })}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function renderCarouselFixture(fixture: FixtureScenario) {
  switch (fixture.id) {
    case 'initial-slide':
      return CandidateCarousel({ defaultIndex: 2 })
    case 'vertical':
      return CandidateCarousel({ orientation: 'vertical' })
    case 'multiple-visible':
      return CandidateCarousel({ className: 'radcn-carousel--multiple' })
    case 'spacing':
      return CandidateCarousel({ className: 'radcn-carousel--spacing' })
    case 'keyboard':
      return CandidateCarousel({ defaultIndex: 1 })
    case 'custom-token':
      return CandidateCarousel({ className: 'radcn-fixture-custom-carousel', defaultIndex: 1 })
    default:
      return CandidateCarousel({})
  }
}
