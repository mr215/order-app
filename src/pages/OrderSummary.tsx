import React, { useState, useEffect } from 'react'
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
import { observer } from 'mobx-react-lite'

import { TOAST_DURATION, HOME_ROUTE, ORDER_SUMMARY_ROUTE } from 'utils/config'
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

const OrderSummary: React.FC<RouteComponentProps> = ({
  history,
  location,
  match,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { appStore, orderStore } = useStores()

  const directionsCallback = (distance: number) => {
    orderStore.updateOrder({ job_distance: distance })
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
    setError('')
    setMessage('')

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
              <IonLabel>{formatCurrency(orderStore.subtotal)}</IonLabel>
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
                {formatCurrency(orderStore.subtotal + orderStore.handlingFee)}
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

        {location.pathname === ORDER_SUMMARY_ROUTE && (
          <DirectionsMap
            origin={orderStore.order.pickup_address}
            destination={orderStore.order.delivery_address}
            callback={directionsCallback}
          />
        )}
      </IonContent>

      <FooterWithButton disabled={!!error || !!message} onClick={handleSubmit}>
        Place Order
      </FooterWithButton>
    </IonPage>
  )
}

export default observer(OrderSummary)
