import React, { useState, ReactElement } from 'react'

import { OrderThrough, Order } from 'types'
import OrderContext from './OrderContext'

interface OrderContextProviderProps {
  children: ReactElement
}

function OrderContextProvider(props: OrderContextProviderProps): ReactElement {
  const [order, setOrder] = useState<Order>({
    pickupAddress: '',
    deliveryAddress: '',
    vehicleType: 'car',
    lastestDeliverByTime: '',
    jobName: '',
    orderThrough: OrderThrough.SupplyHound,
    externalOrderId: '',
    items: [],
  })

  const updateOrder = (values: Partial<Order>) => {
    setOrder({ ...order, ...values })
  }

  return <OrderContext.Provider {...props} value={{ order, updateOrder }} />
}

export default OrderContextProvider
