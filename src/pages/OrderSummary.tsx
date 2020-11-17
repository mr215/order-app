import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonContent,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonNote,
  IonPage,
  // IonRouterLink,
} from '@ionic/react'
import styled from 'styled-components'
import { toJS } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react-lite'

import useStores from 'hooks/useStores'
import { formatCurrency } from 'utils/formatters'
import Header from 'components/Header'
import FooterWithButton from 'components/FooterWithButton'
import DirectionsMap from 'components/DirectionsMap'

const Title = styled.h2`
  text-align: center;
`

const OrderSummary: React.FC<RouteComponentProps> = () => {
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

  const handleSubmit = () => {
    console.log(toJS(orderStore.order))
  }

  if (!appStore.currentPaymentMethod) {
    return null
  }

  return (
    <IonPage>
      <Header />

      <IonContent>
        <Title>Payment</Title>

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

      <FooterWithButton onClick={handleSubmit}>Place Order</FooterWithButton>
    </IonPage>
  )
}

export default observer(OrderSummary)
