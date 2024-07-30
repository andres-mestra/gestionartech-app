import { PUBLIC_URL } from '@/constants'
import { Active, ActiveState, Prestamo } from '@/types'
import {
  ActiveResponse,
  LocationBase,
  PrestamoResponse,
} from '@/types/responses'

export const mapperActivo = ({ data }: ActiveResponse): Active => {
  const { id, attributes } = data
  return {
    id,
    placa: attributes.placa,
    name: attributes.name,
    description: attributes.description,
    warrantyDate: new Date(attributes.warrantyDate),
    price: attributes.price,
    createdAt: new Date(attributes.createdAt),
    updatedAt: new Date(attributes.updatedAt),
    publishedAt: new Date(attributes.publishedAt),
    state: attributes?.state as ActiveState,
    prestamo: attributes?.prestamo
      ? mapperPrestamo(attributes.prestamo)
      : undefined,
    location: attributes?.location?.data?.attributes as LocationBase,
    image: `${PUBLIC_URL}${attributes?.image?.data?.attributes?.formats?.medium?.url}`,
  }
}

export const mapperPrestamo = ({ data }: PrestamoResponse): Prestamo => {
  const { id, attributes } = data

  return {
    id,
    state: attributes.state,
    createdAt: new Date(attributes.createdAt),
    updatedAt: new Date(attributes.updatedAt),
    publishedAt: new Date(attributes.publishedAt),
    endDate: new Date(attributes.endDate),
    activos: attributes?.activos
      ? attributes.activos.data.map((activo) => mapperActivo({ data: activo }))
      : [],
    user: attributes?.user
      ? {
          id: attributes.user.data.id,
          ...attributes.user.data.attributes,
        }
      : undefined,
  }
}
