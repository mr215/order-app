import { makeAutoObservable, set } from 'mobx'
import { add, formatISO } from 'date-fns'

import { Order, VehicleType, OrderThrough, DEFAULT_ORDER_ITEM } from 'types'

const DEFAULT_ORDER = {
  pickupAddress: '',
  deliveryAddress: '',
  vehicleType: VehicleType.Truck,
  lastestDeliverBy: formatISO(add(new Date(), { hours: 4 })),
  jobName: '',
  orderThrough: OrderThrough.SupplyHound,
  pickupNote: {
    note: '',
    readyForPickupBy: '',
  },
  deliveryNote: {
    contact: '',
    phone: '',
    note: '',
  },
  orderId: '',
  items: [DEFAULT_ORDER_ITEM],
}

export default class OrderStore {
  order: Order = DEFAULT_ORDER

  constructor() {
    makeAutoObservable(this)
  }

  updateOrder(newOrder: Partial<Order>) {
    set(this.order, newOrder)
  }

  resetOrder() {
    this.updateOrder(DEFAULT_ORDER)
  }
}
