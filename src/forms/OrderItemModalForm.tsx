import React from 'react'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRow,
} from '@ionic/react'

import { OrderItem } from 'types'
import FormikInput from './fields/FormikInput'

interface Props {
  isOpen: boolean
  orderItem: OrderItem
  onSubmit: (orderItem: OrderItem) => void
  onCancel: () => void
}

const OrderItemModalForm: React.FC<Props & FormikProps<OrderItem>> = ({
  isOpen,
  onCancel,
  submitForm,
}) => {
  return (
    <IonModal isOpen={isOpen}>
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

      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="block" fill="outline" onClick={onCancel}>
                Cancel
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton expand="block" onClick={submitForm}>
                OK
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonModal>
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
