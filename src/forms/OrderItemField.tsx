import React, { useState, MouseEventHandler } from 'react'
import styled from 'styled-components'
import { closeCircle } from 'ionicons/icons'
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'

import { OrderItem } from 'types'
import OrderItemModalForm from './OrderItemModalForm'
import ErrorText from './components/ErrorText'

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
  const [showModal, setShowModal] = useState(false)

  const handleRemove: MouseEventHandler = e => {
    e.stopPropagation()

    onRemove()
  }

  const handleChange = (newOrderItem: OrderItem) => {
    setShowModal(false)

    onChange(newOrderItem)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  return (
    <>
      <IonList lines="full">
        <IonItem detail={false} button onClick={() => setShowModal(true)}>
          <IonLabel className="ion-text-wrap">{orderItem.description}</IonLabel>

          <QuantityLabel slot="end">{orderItem.quantity}</QuantityLabel>

          <IonIcon icon={closeCircle} slot="end" onClick={handleRemove} />
        </IonItem>

        {errors.map((error, index) => (
          <ErrorText key={index}>{error}</ErrorText>
        ))}
      </IonList>

      <OrderItemModalForm
        isOpen={showModal}
        orderItem={orderItem}
        onSubmit={handleChange}
        onCancel={handleCancel}
      />
    </>
  )
}

export default OrderItemField
