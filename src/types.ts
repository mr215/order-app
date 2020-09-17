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

export interface DeliveryNote {
  contact: string
  phone: string
  note: string
}

export interface Order {
  jobName: string
  orderThrough: OrderThrough
  pickupAddress: string
  deliveryAddress: string
  vehicleType: string
  lastestDeliverByTime: string
  pickupNote: string
  deliveryNote: DeliveryNote

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
  phone: string
  companyName: string
  accountingEmail: string
  password: string
}

export const DEFAULT_USER: User = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  accountingEmail: '',
  password: '',
}

export type SignUpFormValues = Required<User>

export type LogInFormValues = Partial<User>

export type LandingFormValues = Partial<User>

export interface Supplier {
  name: string
  address: string
  phone: string
  type: string
}

export enum SupplierType {
  All = '',
  Lumber = 'Lumber',
  Hardware = 'Hardware',
  Plumbing = 'Plumbing',
  Electric = 'Electric',
  Landscape = 'Landscape',
  Other = 'Other',
}

export const DEFAULT_SUPPLIER: Supplier = {
  name: '',
  address: '',
  phone: '',
  type: '',
}
