export interface User {
  first_name: string
  last_name: string
  email: string
  phone: string
  company_name: string
  accounting_email: string
  password: string
  favoriteAddresses: string[]
  market_id: string
}

export interface SignUpFormValues extends User {
  agree_terms: boolean
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
  company_name: '',
  accounting_email: '',
  password: '',
  favoriteAddresses: [],
  market_id: '',
}

export const DEFAULT_ORDER_ITEM: OrderItem = {
  description: '',
  quantity: '',
}

interface Entity {
  id: string
  attributes: {}
  relationships?: {}
  type: string
}

interface MarketAttributes {
  name: string
}

export interface MarketEntity extends Entity {
  attributes: MarketAttributes
  type: 'markets'
}

export interface SelectOption {
  label: string
  value: string | number
}
