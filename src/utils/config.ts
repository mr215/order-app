import { VehicleType } from 'types'

export const TOKEN_KEY = 'token'
export const TOAST_DURATION = 2000

export const SIGNUP_ROUTE = '/signup'
export const LANDING_ROUTE = '/landing'
export const LOGIN_ROUTE = '/login'
export const HOME_ROUTE = '/home'

export const BASE_MILEAGE = 10
export const FEES = {
  [VehicleType.Truck]: {
    base: 55,
    perMile: 2.5,
  },
  [VehicleType.Car]: {
    base: 29,
    perMile: 1.5,
  },
}
