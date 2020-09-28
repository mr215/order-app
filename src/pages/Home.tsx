import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonPage } from '@ionic/react'

import { MainOrderFormValues, LocationFormValues } from 'types'
import useStores from 'hooks/useStores'

import Header from 'components/Header'
import MainOrderForm from 'forms/MainOrderForm'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { orderStore } = useStores()
  const { userStore } = useStores()

  const handleSubmit = (values: MainOrderFormValues) => {
    orderStore.updateOrder(values)

    history.push({ pathname: '/order-items' })
  }

  const handleSubmitLocations = (values: LocationFormValues) => {
    userStore.updateUser(values)
  }

  return (
    <IonPage>
      <Header home />

      <MainOrderForm
        user={userStore.user}
        handleSubmitLocations={handleSubmitLocations}
        order={orderStore.order}
        onSubmit={handleSubmit}
      />
    </IonPage>
  )
}

export default Home
