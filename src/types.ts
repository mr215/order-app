export enum OrderThrough {
  SupplyHound = 'SupplyHound',
  Supplier = 'Supplier',
}

export interface OrderItem {
  description: string
  image?: string
}

export interface Order {
  pickupAddress: string
  deliveryAddress: string
  vehicleType: string
  lastestDeliverByTime: string
  jobName: string
  orderThrough: OrderThrough

  items?: OrderItem[]
  externalOrderId?: string
}
