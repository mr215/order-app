import React, { useState, ReactElement } from 'react'
import { formatISO } from 'date-fns'

import { DEFAULT_ORDER_ITEM, OrderThrough, Order, VehicleType } from 'types'
import OrderContext from './OrderContext'

interface OrderContextProviderProps {
  children: ReactElement
}

function OrderContextProvider(props: OrderContextProviderProps): ReactElement {
  const [order, setOrder] = useState<Order>({
    pickupAddress: '',
    deliveryAddress: '',
    vehicleType: VehicleType.Truck,
    lastestDeliverByTime: formatISO(new Date()),
    jobName: '',
    orderThrough: OrderThrough.SupplyHound,
    orderId: '',
    items: [DEFAULT_ORDER_ITEM],
  })

  const updateOrder = (values: Partial<Order>) => {
    setOrder({ ...order, ...values })
  }

  return <OrderContext.Provider {...props} value={{ order, updateOrder }} />
}

export default OrderContextProvider
