import { createContext } from 'react'

import { Order } from 'types'

const OrderContext = createContext({
  order: {},
  updateOrder: (values: Partial<Order>): void => {},
})

export default OrderContext
