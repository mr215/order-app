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

const OrderItemLabel = styled(IonLabel)`
  display: flex !important;
  align-items: center;
`

const QuantityText = styled(IonText)`
  margin-right: 1rem;
  width: 4rem;
`

const DescriptionText = styled(IonText)`
  white-space: pre-wrap;
`

const ErrorLabel = styled(IonLabel)`
  font-size: 0.75rem !important;
  margin: 0.25rem 1.25rem;
`

const OrderItemRow: React.FC<Props> = ({
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
        <OrderItemLabel>
          {orderItem.description || orderItem.quantity ? (
            <>
              <QuantityText>{orderItem.quantity}</QuantityText>
              <DescriptionText>
                {orderItem.description}
              </DescriptionText>
            </>
          ) : (
            <IonText color="medium">
              Tap to enter description and quantity
            </IonText>
          )}
        </OrderItemLabel>

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

export default OrderItemRow
