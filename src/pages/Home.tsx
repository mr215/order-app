import React from 'react'
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

  const handleFavoriteAddress = (address: string) => {
    userStore.favoriteAddress(address)
  }

  const handleUnfavoriteAddress = (address: string) => {
    userStore.unfavoriteAddress(address)
  }

  const handleSubmit = (values: MainOrderFormValues) => {
    orderStore.updateOrder(values)

    history.push({ pathname: '/order-items' })
  }

  return (
    <IonPage>
      <Header home />

      <MainOrderForm
        favoriteAddresses={toJS(userStore.user.favoriteAddresses)}
        order={toJS(orderStore.order)}
        onFavoriteAddress={handleFavoriteAddress}
        onUnfavoriteAddress={handleUnfavoriteAddress}
        onSubmit={handleSubmit}
      />
    </IonPage>
  )
}

export default observer(Home)
