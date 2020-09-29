export interface User {
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  accountingEmail: string
  password: string
  favoriteAddresses: string[]
}

export type SignUpFormValues = User
export type LogInFormValues = Pick<User, 'email' | 'password'>
export type LandingFormValues = Pick<User, 'email'>

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
  quantity: number
  image?: string
}

export interface PickupNote {
  note: string
  readyForPickupTime: string
}

export interface DeliveryNote {
  contact: string
  phone: string
  note: string
}

export interface Supplier {
  id: number
  name: string
  address: string
  phone: string
  type: string
  logo: string
}

export interface Order {
  jobName: string
  orderThrough: OrderThrough
  pickupAddress: string
  deliveryAddress: string
  vehicleType: string
  lastestDeliverByTime: string
  pickupNote: PickupNote
  deliveryNote: DeliveryNote

  items: OrderItem[]
  orderId: string
}

export type MainOrderFormValues = Omit<Order, 'items' | 'orderId'>
export type OrderItemsFormValues = Pick<Order, 'items' | 'orderId'>

export const DEFAULT_USER: User = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  accountingEmail: '',
  password: '',
  favoriteAddresses: [],
}

export const DEFAULT_ORDER_ITEM: OrderItem = {
  description: '',
  quantity: 0.0,
}
