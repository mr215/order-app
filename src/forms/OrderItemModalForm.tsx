import React from 'react'
import styled from 'styled-components'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
} from '@ionic/react'

import { OrderItem } from 'types'
import FormikInput from './fields/FormikInput'

interface Props {
  isOpen: boolean
  orderItem: OrderItem
  onSubmit: (orderItem: OrderItem) => void
  onCancel: () => void
}

const StyledIonModal = styled(IonModal)`
  // --border-radius: 0.5rem;
  // --max-width: 80%;
  // --max-height: 400px;
`

const StyledIonFooter = styled(IonFooter)`
  display: flex;
`

const OrderItemModalForm: React.FC<Props & FormikProps<OrderItem>> = ({
  isOpen,
  onCancel,
  submitForm,
}) => {
  return (
    <StyledIonModal isOpen={isOpen}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Edit Order Item</IonLabel>
          </IonListHeader>

          <Field
            name="description"
            component={FormikInput}
            type="text"
            label="Description"
            required
          />

          <Field
            name="quantity"
            component={FormikInput}
            type="number"
            label="Quantity"
            required
          />
        </IonList>
      </IonContent>

      <StyledIonFooter>
        <IonButton expand="block" fill="outline" onClick={onCancel}>
          Close Modal
        </IonButton>

        <IonButton expand="block" onClick={submitForm}>
          OK
        </IonButton>
      </StyledIonFooter>
    </StyledIonModal>
  )
}

export default withFormik<Props, OrderItem>({
  displayName: 'OrderItemModalForm',
  enableReinitialize: true,

  mapPropsToValues({ orderItem }: Props): OrderItem {
    return orderItem
  },

  handleSubmit(
    values: OrderItem,
    { props: { onSubmit }, setSubmitting }: FormikBag<Props, OrderItem>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(OrderItemModalForm)
