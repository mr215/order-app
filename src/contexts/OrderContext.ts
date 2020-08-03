import { createContext } from 'react'

import { Order } from 'types'

interface OrderContextProps {
  order: Order
  updateOrder: (values: Partial<Order>) => void
}

const OrderContext = createContext<OrderContextProps>({
  order: {} as Order,
  updateOrder: () => {},
})

export default OrderContext
