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
  orderThrough: string

  items?: OrderItem[]
  externalOrderId?: string
}
