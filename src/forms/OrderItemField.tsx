import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { closeCircle } from 'ionicons/icons'
import { IonIcon, IonItem, IonItemGroup, IonLabel, IonText } from '@ionic/react'

import { OrderItem } from 'types'

interface Props {
  orderItem: OrderItem
  errors?: { [key: string]: string }
  onEdit: () => void
  onRemove: () => void
}

const QuantityLabel = styled.div`
  text-align: right;
`

const ErrorLabel = styled(IonLabel)`
  font-size: 0.75rem !important;
  margin-left: 1rem;
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
    <IonItemGroup>
      <IonItem detail={false} lines="full" button onClick={handleEdit}>
        <IonLabel className="ion-text-wrap">
          {orderItem.description || (
            <IonText color="medium">
              Click to enter description and quantity
            </IonText>
          )}
        </IonLabel>

        <QuantityLabel slot="end">{orderItem.quantity}</QuantityLabel>

        <IonIcon icon={closeCircle} slot="end" onClick={handleRemove} />
      </IonItem>

      {Object.keys(errors).map(key => (
        <ErrorLabel key={key} color="danger">
          {errors[key]}
        </ErrorLabel>
      ))}
    </IonItemGroup>
  )
}

export default OrderItemField
