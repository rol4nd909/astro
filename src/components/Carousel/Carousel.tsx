import clsx from 'clsx'
import { type HTMLAttributes, useRef, useState, type KeyboardEvent } from 'react'
import { useScroll } from '../../../hooks/useScroll'
import styles from './Carousel.module.scss'

type Props = {
  children: JSX.Element[]
  indicators?: boolean
  buttons?: boolean
  title?: string
} & HTMLAttributes<HTMLDivElement>

const scrollToIndex = (scrollport: HTMLDivElement, index: number) => {
  const element = scrollport.children[index] as HTMLElement
  const delta = Math.abs(scrollport.offsetLeft - element.offsetLeft)
  const scrollerPadding = parseInt(getComputedStyle(scrollport)['paddingLeft'])
  const pos = scrollport.clientWidth / 2 > delta ? delta - scrollerPadding : delta + scrollerPadding

  scrollport.scrollTo(pos, 0)
}

export function Carousel({ children, indicators, buttons, title, ...attributes }: Props) {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const indicatorsRef = useRef<HTMLElement>(null)
  const main = useRef<HTMLDivElement>(null)

  const handleKeydown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    const target = e.target as HTMLDivElement
    const nextButton = e.currentTarget.querySelector<HTMLDivElement>('.--next')
    const previousButton = e.currentTarget.querySelector<HTMLDivElement>('.--previous')

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()

        if (target.closest(`.${styles.pagination}`)) {
          if (indicatorsRef.current && index < children.length - 1) {
            const nextTab = indicatorsRef.current.children[index + 1] as HTMLDivElement

            nextTab.focus()
            nextTab.click()
          }
        } else {
          nextButton?.click()

          if (index === children.length - 2) {
            previousButton?.focus()
          } else {
            nextButton?.focus()
          }
        }
        break

      case 'ArrowLeft':
        e.preventDefault()

        if (target.closest(`.${styles.pagination}`)) {
          if (indicatorsRef.current && index > 0) {
            const previousTab = indicatorsRef.current.children[index + -1] as HTMLDivElement

            previousTab.focus()
            previousTab.click()
          }
        } else {
          previousButton?.click()

          if (index === 1) {
            nextButton?.focus()
          } else {
            previousButton?.focus()
          }
        }
        break
    }
  }

  useScroll(ref, indicatorsRef, setActive)

  return (
    <div
      {...attributes}
      className={clsx(styles.root, attributes.className)}
      carousel-scrollbar="none"
      aria-label={title && `${title} Carousel`}
      tabIndex={-1}
      aria-roledescription="carousel"
      ref={main}
      onKeyDown={(event) => handleKeydown(event, active)}
    >
      {title && <h2 className={clsx(styles.title)}>{title}</h2>}

      {buttons && (
        <div className={clsx(styles.controls)}>
          <button
            type="button"
            title="Previous Item"
            className={clsx(styles.control)}
            aria-label="Previous Item"
            disabled={active === 0}
            onClick={() => ref.current && scrollToIndex(ref.current, active - 1)}
          >
            <svg aria-hidden="true" viewBox="0 0 32 32">
              <g
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
              >
                <line x1="20" y1="8" x2="12" y2="16" />
                <line x1="12" y1="16" x2="20" y2="24" />
              </g>
            </svg>
          </button>
          <button
            type="button"
            title="Next Item"
            className={clsx(styles.control)}
            aria-label="Next Item"
            disabled={active === children.length - 1}
            onClick={() => ref.current && scrollToIndex(ref.current, active + 1)}
          >
            <svg aria-hidden="true" viewBox="0 0 32 32">
              <g
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
              >
                <line x1="12" y1="8" x2="20" y2="16" />
                <line x1="20" y1="16" x2="12" y2="24" />
              </g>
            </svg>
          </button>
        </div>
      )}

      <div
        className={clsx(styles.scroller)}
        role="group"
        aria-label="Items Scroller"
        aria-live="polite"
        ref={ref}
      >
        {/* Start slides */}
        {children.map((slide, index) => (
          <div
            className={clsx(styles.snap)}
            aria-label={`${index + 1} of ${children.length}`}
            aria-roledescription="item"
            key={index}
            inert={active !== index ? '' : undefined}
          >
            {slide}
          </div>
        ))}
        {/* End slides */}
      </div>

      {indicators && (
        <nav className={clsx(styles.pagination)} ref={indicatorsRef} role="tablist">
          {children.map((indicator, index) => (
            <button
              className={clsx(styles.control)}
              type="button"
              role="tab"
              title={`Item ${index + 1}: ${indicator.props.slide.title}`}
              aria-label={`${indicator.props.slide.title}`}
              aria-setsize={children.length}
              aria-posinset={index + 1}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              key={`dot- ${index}`}
              onClick={() => ref.current && scrollToIndex(ref.current, index)}
            >
              {indicator.props.slide.title}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
