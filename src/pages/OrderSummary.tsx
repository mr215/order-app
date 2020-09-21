import React, { useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonNote,
  IonPage,
  IonRouterLink,
} from '@ionic/react'
import { helpCircle } from 'ionicons/icons'
import styled from 'styled-components'

import { OrderThrough } from 'types'
import useStores from 'hooks/useStores'
import { formatCurrency } from 'utils/formatters'
import Header from 'components/Header'
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
              Total{' '}
              <IonNote>
                (excluding tolls)
                <IonIcon icon={helpCircle} />
              </IonNote>
            </IonLabel>

            <div slot="end">
              <IonLabel>{formatCurrency(total)}</IonLabel>
            </div>
          </IonItem>

          <IonItem lines="full">
            <div slot="start">
              <IonLabel style={{ lineHeight: '2rem' }}>Payment Method</IonLabel>

              <IonNote>
                <IonRouterLink href="/payment-setting">
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

      <IonFooter mode="ios" className="ion-padding">
        <IonButton expand="block" onClick={handleSubmit}>
          Place Order
        </IonButton>
      </IonFooter>
    </IonPage>
  )
}

export default OrderSummary
