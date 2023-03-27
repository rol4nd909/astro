import clsx from 'clsx'
import type { HTMLAttributes } from 'react'
import styles from './Card.module.scss'

type Props = {
  slide: {
    title: string
    copy: string
    imageUrl: string
  }
} & HTMLAttributes<HTMLDivElement>

export const Card = ({ slide, ...attributes }: Props) => {
  return (
    <div {...attributes} className={clsx(styles.root)}>
      <img
        src={slide.imageUrl}
        width={300}
        height={300}
        alt={slide.title}
        className={clsx(styles.image)}
      />
      <div className={clsx(styles.content, 'flow')}>
        <h3>{slide.title}</h3>
        <p>{slide.copy}</p>
      </div>
    </div>
  )
}
