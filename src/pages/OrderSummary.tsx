import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonContent,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonLoading,
  IonNote,
  IonPage,
  IonText,
  IonToast,
  // IonRouterLink,
} from '@ionic/react'
import styled from 'styled-components'
import { observer, useLocalObservable } from 'mobx-react-lite'

import { TOAST_DURATION, HOME_ROUTE } from 'utils/config'
import { formatCurrency } from 'utils/formatters'
import { createOrder } from 'utils/api'
import useStores from 'hooks/useStores'

import Header from 'components/Header'
import FooterWithButton from 'components/FooterWithButton'
import DirectionsMap from 'components/DirectionsMap'

const Title = styled.h2`
  text-align: center;
`

const Error = styled.h5`
  text-align: center;
`

const OrderSummary: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { appStore, orderStore } = useStores()

  const localStore = useLocalObservable(() => ({
    deliveryFee: 0,
    setDeliveryFee(deliveryFee: number) {
      this.deliveryFee = deliveryFee
    },
  }))

  const directionsCallback = (miles: number) => {
    localStore.setDeliveryFee(orderStore.calculateDeliveryFee(miles))
  }

  const handleSubmit = async () => {
    try {
      setError('')
      setLoading(true)

      await createOrder(orderStore.order)
      setMessage('Order has been placed successfully!')
    } catch (e) {
      setError(e.toString())
    } finally {
      setLoading(false)
    }
  }

  const handleToastDismiss = () => {
    orderStore.reset()

    history.push({ pathname: HOME_ROUTE })
  }

  if (!appStore.currentPaymentMethod) {
    return null
  }

  return (
    <IonPage>
      <IonLoading isOpen={loading} />

      {message && (
        <IonToast
          isOpen
          message={message}
          duration={TOAST_DURATION}
          onDidDismiss={handleToastDismiss}
        />
      )}

      <Header />

      <IonContent>
        <Title>Payment</Title>

        {error && (
          <IonText color="danger">
            <Error>{error}</Error>
          </IonText>
        )}

        <IonItemGroup>
          <IonItem lines="full">
            <IonLabel>Delivery</IonLabel>

            <div slot="end">
              <IonLabel>{formatCurrency(localStore.deliveryFee)}</IonLabel>
            </div>
          </IonItem>

          <IonItem lines="full">
            <IonLabel>Order Management</IonLabel>

            <div slot="end">
              <IonLabel>{formatCurrency(orderStore.handlingFee)}</IonLabel>
            </div>
          </IonItem>

          <IonItem lines="full">
            <IonLabel>
              Total <IonNote>(excluding tolls)</IonNote>
            </IonLabel>

            <div slot="end">
              <IonLabel>
                {formatCurrency(
                  localStore.deliveryFee + orderStore.handlingFee
                )}
              </IonLabel>
            </div>
          </IonItem>

          <IonItem lines="full">
            <div slot="start">
              <IonLabel style={{ lineHeight: '2rem' }}>Payment Method</IonLabel>

              {/* TODO: Add it back when supporting multiple credit cards */}
              {/* <IonNote>
                <IonRouterLink routerLink="/payment-setting">
                  Update Payment
                </IonRouterLink>
              </IonNote> */}
            </div>

            <div slot="end">
              <IonLabel>
                **** **** **** {appStore.currentPaymentMethod.card.last4}
              </IonLabel>
            </div>
          </IonItem>
        </IonItemGroup>

        <DirectionsMap
          origin={orderStore.order.pickup_address}
          destination={orderStore.order.delivery_address}
          callback={directionsCallback}
        />
      </IonContent>

      <FooterWithButton disabled={!!error || !!message} onClick={handleSubmit}>
        Place Order
      </FooterWithButton>
    </IonPage>
  )
}

export default observer(OrderSummary)
