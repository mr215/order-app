import React, { useState } from 'react'
import styled from 'styled-components'
import { closeCircle } from 'ionicons/icons'
import { IonIcon, IonItem, IonLabel } from '@ionic/react'

import { OrderItem } from 'types'

interface Props {
  orderItem: OrderItem
  onChange: (orderItem: OrderItem) => void
  onRemove: () => void
}

const QuantityLabel = styled.div`
  text-align: right;
`

const OrderItemInput: React.FC<Props> = ({ orderItem, onChange, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IonItem detail={false} button onClick={() => {}} lines="full">
        <IonLabel className="ion-text-wrap">{orderItem.description}</IonLabel>

        <QuantityLabel slot="end">{orderItem.quantity}</QuantityLabel>

        <IonIcon icon={closeCircle} slot="end" onClick={onRemove} />
      </IonItem>
    </>
  )
}

export default OrderItemInput
