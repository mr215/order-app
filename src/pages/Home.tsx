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
  const { appStore, orderStore } = useStores()

  const handleSubmit = (values: MainOrderFormValues) => {
    orderStore.updateOrder(values)

    history.push({ pathname: '/order-items' })
  }

  useEffect(() => {
    if (!appStore.paymentMethods.length) {
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
