import { VehicleType } from 'types'

export const METERS_PER_MILE = 1609
export const DEFAULT_MAP_CENTER = {
  lat: 37.77,
  lng: -122.42,
}
export const DEFAULT_MAP_ZOOM = 10

export const TOKEN_KEY = 'token'
export const TOAST_DURATION = 2000

export const DISTANCE_THRESHOLDS = {
  [VehicleType.Truck]: 10,
  [VehicleType.Car]: 10,
}

export const BASE_FARES = {
  [VehicleType.Truck]: 55,
  [VehicleType.Car]: 29,
}

export const DISTANCE_RATES = {
  [VehicleType.Truck]: 2.5,
  [VehicleType.Car]: 1.5,
}

export const ORDER_MANAGEMENT_FEE = 5

export const SIGNUP_ROUTE = '/signup'
export const LANDING_ROUTE = '/landing'
export const LOGIN_ROUTE = '/login'
export const HOME_ROUTE = '/home'
