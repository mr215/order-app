import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { closeCircle } from 'ionicons/icons'
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'

import { OrderItem } from 'types'
import ErrorText from './components/ErrorText'

interface Props {
  orderItem: OrderItem
  errors?: { [key: string]: string }
  onEdit: () => void
  onRemove: () => void
}

const QuantityLabel = styled.div`
  text-align: right;
`

const OrderItemField: React.FC<Props> = ({
  orderItem,
  errors = {},
  onEdit,
  onRemove,
}) => {
  const handleEdit: MouseEventHandler = e => {
    e.stopPropagation()
    onEdit()
  }

  const handleRemove: MouseEventHandler = e => {
    e.stopPropagation()

    onRemove()
  }

  return (
    <IonList lines="full">
      <IonItem detail={false} button onClick={handleEdit}>
        <IonLabel className="ion-text-wrap">{orderItem.description}</IonLabel>

        <QuantityLabel slot="end">{orderItem.quantity}</QuantityLabel>

        <IonIcon icon={closeCircle} slot="end" onClick={handleRemove} />
      </IonItem>

      {Object.keys(errors).map(key => (
        <ErrorText key={key}>{errors[key]}</ErrorText>
      ))}
    </IonList>
  )
}

export default OrderItemField
