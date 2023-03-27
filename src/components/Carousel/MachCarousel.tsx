import { Carousel } from './Carousel'
import { Card } from '../Card/Card'
import { slides } from '../../../data/pageContent'

export default function MachCarousel() {
  return (
    <Carousel indicators={slides.map((s) => s.title)} buttons>
      {slides.map((slide) => (
        <Card slide={slide} key={slide.title} />
      ))}
    </Carousel>
  )
}
