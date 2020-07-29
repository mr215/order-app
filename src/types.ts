export enum OrderThrough {
  SupplyHound = 'SupplyHound',
  Supplier = 'Supplier',
}

export interface OrderItem {
  description: string
  image?: string
}

export interface Order {
  jobName: string
  orderThrough: OrderThrough
  pickupAddress: string
  deliveryAddress: string
  vehicleType: string
  lastestDeliverByTime: string

  items?: OrderItem[]
  externalOrderId?: string
}

export type MainOrderFormValues = Order
