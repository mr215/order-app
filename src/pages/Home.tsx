import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage } from '@ionic/react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { MainOrderFormValues } from 'types'
import useStores from 'hooks/useStores'

import Header from 'components/Header'
import MainOrderForm from 'forms/MainOrderForm'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { userStore, orderStore } = useStores()

  const handleSubmit = (values: MainOrderFormValues) => {
    orderStore.updateOrder(values)

    history.push({ pathname: '/order-items' })
  }

  useEffect(() => {
    // If payment is not setup, redirect to payment-setup page
    if (true) {
      // TODO: Change the conditional
      history.push({ pathname: '/payment-setup' })
    }
  }, [])

  return (
    <IonPage>
      <Header home />

      <MainOrderForm order={toJS(orderStore.order)} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default observer(Home)
