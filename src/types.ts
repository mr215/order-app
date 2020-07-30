export enum OrderThrough {
  SupplyHound = 'SupplyHound',
  Supplier = 'Supplier',
}

export enum VehicleType {
  Car = 'car',
  Truck = 'truck',
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

export type MainOrderFormValues = Omit<Order, 'items' | 'externalOrderId'>

export type ExternalOrderFormValues = Pick<Order, 'externalOrderId'>
export type ItemsFormValues = Pick<Order, 'items'>
