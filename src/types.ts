export interface User {
  first_name: string
  last_name: string
  email: string
  phone: string
  // companyName: string
  // accountingEmail: string
  password: string
  favoriteAddresses: string[]
}

export interface SignUpFormValues extends User {
  agreeTerms: boolean
}
export interface LogInFormValues {
  password: string
}
export interface LandingFormValues {
  email: string
}

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
  quantity: number | ''
  image?: string
}

export interface PickupNote {
  note: string
  readyForPickupBy: string
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
  lastestDeliverBy: string
  pickupNote: PickupNote
  deliveryNote: DeliveryNote

  items: OrderItem[]
  orderId: string
}

export type MainOrderFormValues = Omit<Order, 'items' | 'orderId'>
export type OrderItemsFormValues = Pick<Order, 'items' | 'orderId'>

export const DEFAULT_USER: User = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  // companyName: '',
  // accountingEmail: '',
  password: '',
  favoriteAddresses: [],
}

export const DEFAULT_ORDER_ITEM: OrderItem = {
  description: '',
  quantity: '',
}
