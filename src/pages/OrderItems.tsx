import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage } from '@ionic/react'

import { OrderItemsFormValues } from 'types'
import OrderContext from 'contexts/OrderContext'
import Header from 'components/Header'
import OrderItemsForm from 'forms/OrderItemsForm'

const OrderItems: React.FC<RouteComponentProps> = ({ history }) => {
  const { order, updateOrder } = useContext(OrderContext)

  const handleSubmit = (values: OrderItemsFormValues) => {
    updateOrder(values)

    setTimeout(() => {
      history.push({ pathname: '/page/payment-summary' })
    })
  }

  return (
    <IonPage>
      <Header />

      <OrderItemsForm order={order} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default OrderItems
