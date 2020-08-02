import React, { useContext } from 'react'

import { ExternalOrderFormValues, OrderItemsFormValues } from 'types'
import OrderContext from 'contexts/OrderContext'
import OrderItemsForm from 'components/forms/OrderItemsForm'
import ExternalOrderForm from 'components/forms/ExternalOrderForm'

export default function OrderItems() {
  const { order, updateOrder } = useContext(OrderContext)

  const handleSubmit = (values: OrderItemsFormValues) => {
    // TODO
  }

  return (
    <OrderItemsForm
      defaultValues={order as OrderItemsFormValues}
      onSubmit={handleSubmit}
    />
  )
}
