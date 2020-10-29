import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonLoading, IonPage } from '@ionic/react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { MainOrderFormValues } from 'types'
import useStores from 'hooks/useStores'
import { fetchProfile } from 'utils/api'

import Header from 'components/Header'
import MainOrderForm from 'forms/MainOrderForm'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { profileStore, orderStore } = useStores()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values: MainOrderFormValues) => {
    orderStore.updateOrder(values)

    history.push({ pathname: '/order-items' })
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const {
          data: { data: profile },
        } = await fetchProfile()

        profileStore.setProfile(profile)

        // If payment is not setup, redirect to payment-setup page
        // if (true) {
        //   // TODO: Change the conditional
        //   history.push({ pathname: '/payment-setup' })
        // }
      } finally {
        setLoading(false)
      }
    }

    // Load data
    if (!profileStore.profile) {
      loadData()
    }
  }, [])

  return (
    <IonPage>
      <IonLoading isOpen={loading} />

      <Header home />

      <MainOrderForm order={toJS(orderStore.order)} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default observer(Home)
