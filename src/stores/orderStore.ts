import { makeAutoObservable, set } from 'mobx'
import { add, formatISO } from 'date-fns'

import {
  DISTANCE_THRESHOLDS,
  BASE_FARES,
  DISTANCE_RATES,
  ORDER_MANAGEMENT_FEE,
} from 'utils/config'
import { Order, VehicleType, DEFAULT_ORDER_ITEM } from 'types'

const DEFAULT_ORDER = {
  job_name: '',
  vehicle_type: VehicleType.Truck,
  ordered_directly: false,
  order_no: '',
  items: [DEFAULT_ORDER_ITEM],

  pickup_address: '',
  pickup_datetime: formatISO(add(new Date(), { hours: 1 })),
  pickup_note: '',

  delivery_address: '',
  delivery_datetime: formatISO(add(new Date(), { hours: 4 })),
  delivery_username: '',
  delivery_phone: '',
  delivery_note: '',

  job_distance: 0,
}

export default class OrderStore {
  order: Order = DEFAULT_ORDER

  constructor() {
    makeAutoObservable(this)
  }

  get handlingFee(): number {
    return this.order.ordered_directly ? 0 : ORDER_MANAGEMENT_FEE
  }

  get subtotal(): number {
    const baseFare = BASE_FARES[this.order.vehicle_type]
    const distanceRate = DISTANCE_RATES[this.order.vehicle_type]
    const distanceThreshold = DISTANCE_THRESHOLDS[this.order.vehicle_type]

    return this.order.job_distance <= distanceThreshold
      ? baseFare
      : baseFare + (this.order.job_distance - distanceThreshold) * distanceRate
  }

  updateOrder(newOrder: Partial<Order>) {
    set(this.order, newOrder)
  }

  reset() {
    this.updateOrder(DEFAULT_ORDER)
  }
}
