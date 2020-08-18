import React, { useState } from 'react'
import styled from 'styled-components'
import { closeCircle } from 'ionicons/icons'
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'

import { OrderItem } from 'types'
import ErrorText from './ErrorText'

interface Props {
  orderItem: OrderItem
  errors?: string[]
  onChange: (orderItem: OrderItem) => void
  onRemove: () => void
}

const QuantityLabel = styled.div`
  text-align: right;
`

const OrderItemField: React.FC<Props> = ({
  orderItem,
  errors = [],
  onChange,
  onRemove,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <IonList lines="full">
      <IonItem detail={false} button onClick={() => {}}>
        <IonLabel className="ion-text-wrap">{orderItem.description}</IonLabel>

        <QuantityLabel slot="end">{orderItem.quantity}</QuantityLabel>

        <IonIcon icon={closeCircle} slot="end" onClick={onRemove} />
      </IonItem>

      {errors.map((error, index) => (
        <ErrorText key={index}>{error}</ErrorText>
      ))}
    </IonList>
  )
}

export default OrderItemField
