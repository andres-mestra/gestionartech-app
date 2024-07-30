import { onErrorImage } from '@/helpers/onErrorImage'

interface Props {
  alt: string
  src?: string
  width?: number
  height?: number
  defaultImage?: string
}

export const CustomImage = ({
  src,
  alt,
  width = 150,
  height = 150,
  defaultImage = '/default_active_image.avif',
}: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ objectFit: 'cover' }}
      width={width}
      height={height}
      onError={(e) => onErrorImage(e, defaultImage)}
    />
  )
}
