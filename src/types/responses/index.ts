interface ResponseBase<TData> {
  data: TData
  meta?: Meta
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface Data<TAttributes> {
  id: number
  attributes: TAttributes
}

export interface ActivesResponse
  extends ResponseBase<
    Data<
      ActiveBase & {
        location?: LocationResponse
        prestamo?: PrestamoResponse
        image?: ImagesResponse
      }
    >[]
  > {}

export interface ActiveResponse
  extends ResponseBase<
    Data<
      ActiveBase & {
        location?: LocationResponse
        prestamo?: PrestamoResponse
        image?: ImagesResponse
      }
    >
  > {}

export interface PrestamosResponse
  extends ResponseBase<
    Data<
      PrestamoBase & {
        activos?: ActivesResponse
        user?: UserResponse
      }
    >[]
  > {}
export interface PrestamoResponse
  extends ResponseBase<
    Data<
      PrestamoBase & {
        activos?: ActivesResponse
        user?: UserResponse
      }
    >
  > {}

export interface LocationResponse extends ResponseBase<Data<LocationBase>> {}
export interface UserResponse extends ResponseBase<Data<UserBase>> {}
export interface ImagesResponse extends ResponseBase<Data<Image>[]> {}

export interface ActiveBase {
  placa: string
  name: string
  description: string
  warrantyDate: Date
  price: number
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  state: string
}

export interface LocationBase {
  name: string
  address: string
  phoneNumber: string
  observations: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
}

export interface PrestamoBase {
  state: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  endDate: Date
}

export interface UserBase {
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Image {
  name: string
  alternativeText?: string | null
  formats?: ImageFormats | null
}

export interface ImageFormats {
  thumbnail: ImageFormat
  large: ImageFormat
  medium: ImageFormat
  small: ImageFormat
}

interface ImageFormat {
  name: string
  url: string
  width: number
  height: number
}
