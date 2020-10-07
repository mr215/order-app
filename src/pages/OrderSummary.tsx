import React, { useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonContent,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonNote,
  IonPage,
  IonRouterLink,
} from '@ionic/react'
import styled from 'styled-components'

import { OrderThrough } from 'types'
import useStores from 'hooks/useStores'
import { formatCurrency } from 'utils/formatters'
import Header from 'components/Header'
import FooterWithButton from 'components/FooterWithButton'
import DirectionsMap from 'components/DirectionsMap'

const Title = styled.h2`
  text-align: center;
`

const OrderSummary: React.FC<RouteComponentProps> = () => {
  const { orderStore } = useStores()
  const { order } = orderStore

  const deliveryFee = 0 // TODO: Apply estimate cost formula
  const handlingFee = useMemo<number>(
    () => (order.orderThrough === OrderThrough.Supplier ? 0 : 5),
    [order.orderThrough]
  )
  const total = useMemo<number>(() => deliveryFee + handlingFee, [
    deliveryFee,
    handlingFee,
  ])

  const handleSubmit = () => {
    // TODO: Handle placing an order
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
              <IonLabel>{formatCurrency(deliveryFee)}</IonLabel>
            </div>
          </IonItem>

          <IonItem lines="full">
            <IonLabel>Order Management</IonLabel>

            <div slot="end">
              <IonLabel>{formatCurrency(handlingFee)}</IonLabel>
            </div>
          </IonItem>

          <IonItem lines="full">
            <IonLabel>
              Total <IonNote>(excluding tolls)</IonNote>
            </IonLabel>

            <div slot="end">
              <IonLabel>{formatCurrency(total)}</IonLabel>
            </div>
          </IonItem>

          <IonItem lines="full">
            <div slot="start">
              <IonLabel style={{ lineHeight: '2rem' }}>Payment Method</IonLabel>

              <IonNote>
                <IonRouterLink routerLink="/payment-setting">
                  Update Payment
                </IonRouterLink>
              </IonNote>
            </div>

            <div slot="end">
              <IonLabel>**** **** **** 1234</IonLabel>
            </div>
          </IonItem>
        </IonItemGroup>

        <DirectionsMap
          origin={orderStore.order.pickupAddress}
          destination={orderStore.order.deliveryAddress}
        />
      </IonContent>

      <FooterWithButton onClick={handleSubmit}>Place Order</FooterWithButton>
    </IonPage>
  )
}

export default OrderSummary
