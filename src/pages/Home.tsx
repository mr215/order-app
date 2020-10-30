import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonLoading, IonPage, IonToast } from '@ionic/react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { MainOrderFormValues } from 'types'
import useStores from 'hooks/useStores'
import { fetchProfile, fetchPaymentMethods } from 'utils/api'

import Header from 'components/Header'
import MainOrderForm from 'forms/MainOrderForm'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { profileStore, orderStore } = useStores()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (values: MainOrderFormValues) => {
    orderStore.updateOrder(values)

    history.push({ pathname: '/order-items' })
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        const [profileResponse, paymentMethodsResponse] = await Promise.all([
          fetchProfile(),
          fetchPaymentMethods(),
        ])

        profileStore.setProfile(profileResponse.data.data)
        profileStore.setPaymentMethods(paymentMethodsResponse.data.data)

        // If payment is not setup, redirect to payment-setup page
        if (!profileStore.paymentMethods.length) {
          history.push({ pathname: '/payment-setup' })
        }
      } catch (e) {
        setError(e.toString())
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

      {error && <IonToast isOpen message={error} duration={200} />}

      <Header home />

      <MainOrderForm order={toJS(orderStore.order)} onSubmit={handleSubmit} />
    </IonPage>
  )
}

export default observer(Home)
