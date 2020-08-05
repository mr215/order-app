import React, { useContext } from 'react'

import { OrderItemsFormValues } from 'types'
import OrderContext from 'contexts/OrderContext'
import OrderItemsForm from 'components/forms/OrderItemsForm'

export default function OrderItems() {
  const { order, updateOrder } = useContext(OrderContext)

  const handleSubmit = (values: OrderItemsFormValues) => {
    updateOrder(values)

    // TODO: Redirect to payment summary page
  }

  return <OrderItemsForm order={order} onSubmit={handleSubmit} />
}
