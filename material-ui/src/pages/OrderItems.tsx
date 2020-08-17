import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { OrderItemsFormValues } from 'types'
import OrderContext from 'contexts/OrderContext'
import OrderItemsForm from 'components/forms/OrderItemsForm'

interface OrderItemsProps extends RouteComponentProps<any> {}

export default function OrderItems({ history }: OrderItemsProps) {
  const { order, updateOrder } = useContext(OrderContext)

  const handleSubmit = (values: OrderItemsFormValues) => {
    updateOrder(values)

    setTimeout(() => {
      history.push('/payment-summary')
    })
  }

  return <OrderItemsForm order={order} onSubmit={handleSubmit} />
}
