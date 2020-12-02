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

export enum VehicleType {
  Car = 'Car',
  Truck = 'Truck',
}

export interface OrderItem {
  description: string
  quantity: number | ''
  image?: string
}

export interface Order {
  job_name: string
  vehicle_type: VehicleType
  ordered_directly: boolean
  order_no: string
  items: OrderItem[]

  pickup_address: string
  pickup_datetime: string
  pickup_note: string

  delivery_address: string
  delivery_datetime: string
  delivery_username: string
  delivery_phone: string
  delivery_note: string

  job_distance: number
}

export type MainOrderFormValues = Omit<Order, 'items' | 'order_no'>
export type OrderItemsFormValues = Pick<Order, 'items' | 'order_no'>

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
