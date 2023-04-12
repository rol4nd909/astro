import { Carousel } from './Carousel'
import { Card } from '../Card/Card'
import { slides } from '../../../data/pageContent'

export default function MachCarousel() {
  return (
    <Carousel indicators buttons>
      {slides.map((slide, index) => (
        <Card slide={slide} key={index} />
      ))}

      {/* <figure className="animate-visibility captioned-image">
        <img
          loading="lazy"
          width="1280"
          height="720"
          src="https://picsum.photos/seed/this/1280/720.webp"
          alt="Blue ocean with a large wave"
        />
        <figcaption>
          <a href="#">Learn more about large ocean waves</a>
        </figcaption>
      </figure>

      <figure className="animate-visibility captioned-image">
        <img
          loading="lazy"
          width="1280"
          height="720"
          src="https://picsum.photos/seed/this/1280/720.webp"
          alt="Blue ocean with a large wave"
        />
        <figcaption>
          <a href="#">Learn more about large ocean waves</a>
        </figcaption>
      </figure>

      <figure className="animate-visibility captioned-image">
        <img
          loading="lazy"
          width="1280"
          height="720"
          src="https://picsum.photos/seed/this/1280/720.webp"
          alt="Blue ocean with a large wave"
        />
        <figcaption>
          <a href="#">Learn more about large ocean waves</a>
        </figcaption>
      </figure>

      <figure className="animate-visibility captioned-image">
        <img
          loading="lazy"
          width="1280"
          height="720"
          src="https://picsum.photos/seed/this/1280/720.webp"
          alt="Blue ocean with a large wave"
        />
        <figcaption>
          <a href="#">Learn more about large ocean waves</a>
        </figcaption>
      </figure> */}
    </Carousel>
  )
}
