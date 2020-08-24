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
  quantity?: number
  image?: string
}

export interface Order {
  jobName: string
  orderThrough: OrderThrough
  pickupAddress: string
  deliveryAddress: string
  vehicleType: string
  lastestDeliverByTime: string

  items: OrderItem[]
  orderId: string
}

export type MainOrderFormValues = Omit<Order, 'items' | 'orderId'>

export type OrderItemsFormValues = Pick<Order, 'items' | 'orderId'>

export const DEFAULT_ORDER_ITEM: OrderItem = {
  description: '',
}

export interface User {
  firstName: string
  lastName: string
  email: string
  phone: string,
  companyName: string,
  accountingEmail: string,
  password: string,
}

export type SignUpFormValues = Required<User>

export type LogInFormValues = Partial<User>

