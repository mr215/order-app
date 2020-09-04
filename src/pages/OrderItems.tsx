import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage } from '@ionic/react'

import { OrderItemsFormValues } from 'types'
import useStores from 'hooks/useStores'
import Header from 'components/Header'
import OrderItemsForm from 'forms/OrderItemsForm'

const OrderItems: React.FC<RouteComponentProps> = ({ history }) => {
  const { orderStore, userStore } = useStores()

  const handleSubmit = (values: OrderItemsFormValues) => {
    orderStore.updateOrder(values)

    if (userStore.user.email !== '') {
      history.push({ pathname: '/page/payment-summary' })
    } else {
      history.push({ pathname: '/landing' })
    }
  }

  return (
    <IonPage>
      <Header />

      <OrderItemsForm order={orderStore.order} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default OrderItems
