import { makeAutoObservable, set } from 'mobx'
import { add, formatISO } from 'date-fns'

import { BASE_MILEAGE, FEES } from 'utils/config'
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
}

export default class OrderStore {
  order: Order = DEFAULT_ORDER

  constructor() {
    makeAutoObservable(this)
  }

  get handlingFee(): number {
    return this.order.ordered_directly ? 0 : 5
  }

  updateOrder(newOrder: Partial<Order>) {
    set(this.order, newOrder)
  }

  resetOrder() {
    this.updateOrder(DEFAULT_ORDER)
  }

  calculateDeliveryFee(miles: number): number {
    const fee = FEES[this.order.vehicle_type]

    return miles <= BASE_MILEAGE
      ? fee.base
      : fee.base + (miles - BASE_MILEAGE) * fee.perMile
  }
}
