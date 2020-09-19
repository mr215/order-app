import { observable, action, set } from 'mobx'
import { formatISO } from 'date-fns'

import { Order, VehicleType, OrderThrough, DEFAULT_ORDER_ITEM } from 'types'

const DEFAULT_ORDER = {
  pickupAddress: '',
  deliveryAddress: '',
  vehicleType: VehicleType.Truck,
  lastestDeliverByTime: formatISO(new Date()),
  jobName: '',
  orderThrough: OrderThrough.SupplyHound,
  pickupNote: {
    note: '',
    readyForPickupTime: '',
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
  @observable
  order: Order = DEFAULT_ORDER

  @action
  updateOrder(newOrder: Partial<Order>) {
    set(this.order, newOrder)
  }

  @action
  resetOrder() {
    this.updateOrder(DEFAULT_ORDER)
  }
}
