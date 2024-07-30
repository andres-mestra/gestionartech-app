import { ActiveBase, LocationBase, PrestamoBase, UserBase } from './responses'

export interface Active extends ActiveBase {
  id: number
  state: ActiveState
  location?: LocationBase
  prestamo?: Prestamo
}

export type ActiveState = 'bueno' | 'malo' | 'reparacion' | 'desuso'

export interface Prestamo extends PrestamoBase {
  id: number
  activos?: Active[]
  user?: User
}

export interface User extends UserBase {
  id: number
}
