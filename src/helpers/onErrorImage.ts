import { SyntheticEvent } from 'react'

export function onErrorImage(
  e: SyntheticEvent<HTMLImageElement>,
  defaultImage: string
) {
  const element = e.target as HTMLImageElement
  element.src = defaultImage
  element.onerror = null
}
