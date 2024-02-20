import { type RefObject, useEffect } from 'react'

export function useScroll<E extends HTMLElement>(
  ref: RefObject<E>,
  indicatorsRef: RefObject<E>,
  callback: (n: number) => void
) {
  useEffect(() => {
    if (ref.current) {
      const observer = createObservers(ref.current, (index) => {
        if (indicatorsRef.current) {
          const child = indicatorsRef.current.children[index] as HTMLElement

          const direction = 1

          indicatorsRef.current.scroll({
            left:
              child.offsetLeft -
              (direction > 0 ? indicatorsRef.current.clientWidth - child.offsetWidth : 0),
          })
        }

        callback(index)
      })

      for (let item of ref.current.children) {
        observer.observe(item)
      }
      return () => {
        if (ref.current) {
          for (let item of ref.current.children) {
            observer.unobserve(item)
          }
        }
      }
    }
  }, [ref.current])
}

const createObservers = (scrollContainer: HTMLElement, onIndexChange: (index: number) => void) =>
  new IntersectionObserver(
    (observations) => {
      const currentSelected = [...scrollContainer.children].findIndex(
        (child) => child === observations.find((o) => o.isIntersecting)?.target
      )

      if (currentSelected > -1) {
        onIndexChange(currentSelected)
      }
    },
    {
      root: scrollContainer,
      threshold: 0.6,
    }
  )
