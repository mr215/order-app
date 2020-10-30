import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonContent,
  IonLabel,
  IonLoading,
  IonPage,
  IonToast,
} from '@ionic/react'
import { observer } from 'mobx-react-lite'

import { HOME_ROUTE, TOAST_DURATION } from 'utils/config'
import useStores from 'hooks/useStores'
import { createPaymentSetupIntent as createPaymentSetupIntentApi } from 'utils/api'

import Header from 'components/Header'

const PaymentSetup: React.FC<RouteComponentProps> = ({ history }) => {
  // TODO: Load payment info
  // If customer is not created, create the stripe customer
  // Create SetupIntent and get stripe_setup_intent_client_secret
  // Collect card details using stripe.js
  // Submit payment
  const { profileStore } = useStores()
  const [setupIntentClientSecret, setSetupIntentClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (profileStore.paymentMethods.length) {
    history.push({ pathname: HOME_ROUTE })
  }

  useEffect(() => {
    const createPaymentSetupIntent = async () => {
      try {
        setLoading(true)

        const { data } = await createPaymentSetupIntentApi()

        console.log('data', data)
      } catch (e) {
        setError(e.toString())
      } finally {
        setLoading(false)
      }
    }

    // Create setup intent
    createPaymentSetupIntent()
  }, [])

  return (
    <IonPage>
      <IonLoading isOpen={loading} />

      {error && <IonToast isOpen message={error} duration={TOAST_DURATION} />}

      <Header home />

      <IonContent>
        <IonLabel>Setup Payment</IonLabel>
      </IonContent>
    </IonPage>
  )
}

export default observer(PaymentSetup)
