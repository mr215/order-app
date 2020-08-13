import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage } from '@ionic/react'

import { MainOrderFormValues } from 'types'
import OrderContext from 'contexts/OrderContext'
import Header from 'components/Header'
import MainOrderForm from 'forms/MainOrderForm'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { order, updateOrder } = useContext(OrderContext)

  const handleSubmit = (values: MainOrderFormValues) => {
    updateOrder(values)

    setTimeout(() => {
      history.push({ pathname: '/order-items' })
    })
  }

  return (
    <IonPage>
      <Header />

      <MainOrderForm order={order} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default Home
