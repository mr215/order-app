export interface User {
  first_name: string
  last_name: string
  email: string
  phone: string
  company_name: string
  accounting_email: string
  password: string
  market_id: string
}

export interface Profile {
  first_name: string
  last_name: string
  name: string
  email: string
  phone: string
  company_name: string
  accounting_email: string
  role: string
}

// Stripe Payment method
export interface PaymentMethod {
  id: string
  card: {
    last4: string
    brand: string
    exp_year: number
    exp_month: number
  }
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

export interface Order {
  jobName: string
  orderThrough: OrderThrough
  pickupAddress: string
  deliveryAddress: string
  vehicleType: VehicleType
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

interface Entity {
  id: string
  attributes: {}
  relationships?: {}
  type: string
}

export interface SupplierAttributes {
  store_type: string
  store_name: string
  address: string
  phone: string
  supplier_order_email: string
  sh_order_email: string
  logo: string
  website: string
}

export interface SupplierEntity extends Entity {
  attributes: SupplierAttributes
  type: 'suppliers'
}

export interface FavoriteAddressAttributes {
  address: string
}

export interface FavoriteAddressEntity extends Entity {
  attributes: FavoriteAddressAttributes
  type: 'favorite_addresses'
}

export interface ProfileEntity extends Entity {
  attributes: Profile
  type: 'users'
}
