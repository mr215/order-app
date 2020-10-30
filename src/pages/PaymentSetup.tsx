import React, { useState, useEffect, FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonContent, IonLoading, IonPage, IonToast } from '@ionic/react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { observer } from 'mobx-react-lite'

import { HOME_ROUTE, TOAST_DURATION } from 'utils/config'
import useStores from 'hooks/useStores'
import { createPaymentSetupIntent as createPaymentSetupIntentApi } from 'utils/api'

import Header from 'components/Header'
import CardSection from 'components/CardSection'

const PaymentSetup: React.FC<RouteComponentProps> = ({ history }) => {
  const { profileStore } = useStores()

  const [setupIntentClientSecret, setSetupIntentClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  // If payment methods are linked already, return to home page
  if (profileStore.paymentMethods.length) {
    history.push({ pathname: HOME_ROUTE })
  }

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements || !setupIntentClientSecret) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmCardSetup(setupIntentClientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: profileStore.profile!.attributes.name,
        },
      },
    })

    if (result.error) {
      // Display result.error.message in your UI.
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
    }
  }

  // Create setup intent when mounted
  // If stripe customer and setup_intent already exists for the current user,
  // api returns the existing one, otherwise creates stripe customer and setup_intent
  useEffect(() => {
    const createPaymentSetupIntent = async () => {
      try {
        setLoading(true)

        // It returns client_secret
        const { data } = await createPaymentSetupIntentApi()

        setSetupIntentClientSecret(data.client_secret)
      } catch (e) {
        setError(e.toString())
      } finally {
        setLoading(false)
      }
    }

    // Loads client_secret
    createPaymentSetupIntent()
  }, [])

  return (
    <IonPage>
      <IonLoading isOpen={loading} />

      {error && <IonToast isOpen message={error} duration={TOAST_DURATION} />}

      <Header home />

      <IonContent>
        <form onSubmit={handleSubmit}>
          <CardSection />

          <button disabled={!stripe}>Save Card</button>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default observer(PaymentSetup)
