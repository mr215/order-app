import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonContent,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonLoading,
  IonPage,
  IonText,
  IonToast,
} from '@ionic/react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { observer } from 'mobx-react-lite'

import { HOME_ROUTE, TOAST_DURATION } from 'utils/config'
import useStores from 'hooks/useStores'
import { createPaymentSetupIntent as createPaymentSetupIntentApi } from 'utils/api'

import Header from 'components/Header'
import FooterWithButton from 'components/FooterWithButton'
import FieldHeader from 'forms/components/FieldHeader'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}

const PaymentSetup: React.FC<RouteComponentProps> = ({ history }) => {
  const { appStore } = useStores()

  const [setupIntentClientSecret, setSetupIntentClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const handleChange = (event: StripeCardElementChangeEvent) => {
    if (event.error) {
      setError(event.error.message)
    } else {
      setError('')
    }
  }

  const handleSubmit = async () => {
    if (!stripe || !elements || !setupIntentClientSecret) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmCardSetup(setupIntentClientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: appStore.profile!.attributes.name,
          email: appStore.profile!.attributes.email,
          phone: appStore.profile!.attributes.phone,
        },
      },
    })

    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error!.message!)
    } else {
      setError('')

      setSuccess('Card has been linked successfully!')

      // Load payment methods after 3 seconds of showing the message
      setTimeout(() => {
        appStore.loadPrivateData()
      }, TOAST_DURATION)
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

  // If payment methods are linked already, return to home page
  useEffect(() => {
    if (appStore.paymentMethods.length) {
      history.push({ pathname: HOME_ROUTE })
    }
  }, [appStore.paymentMethods.length])

  return (
    <IonPage>
      <IonLoading isOpen={loading} />

      {success && (
        <IonToast isOpen message={success} duration={TOAST_DURATION} />
      )}

      <Header home />

      <IonContent>
        <IonText className="ion-text-center">
          <h2>Add credit card</h2>
        </IonText>

        <IonItemGroup>
          <FieldHeader label="Card details" />

          <IonItem mode="ios" lines="none">
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              onChange={handleChange}
            />

            {error && (
              <IonLabel color="danger" position="stacked">
                {error}
              </IonLabel>
            )}
          </IonItem>
        </IonItemGroup>
      </IonContent>

      <FooterWithButton disabled={!stripe || !!error} onClick={handleSubmit}>
        Save
      </FooterWithButton>
    </IonPage>
  )
}

export default observer(PaymentSetup)
