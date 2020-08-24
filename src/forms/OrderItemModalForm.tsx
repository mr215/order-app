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
import * as Yup from 'yup'

import { DEFAULT_ORDER_ITEM, OrderItem } from 'types'
import FormikInput from './fields/FormikInput'
import FormikTextarea from './fields/FormikTextarea'

interface Props {
  orderItem: OrderItem | null
  onSubmit: (orderItem: OrderItem) => void
  onCancel: () => void
}

const OrderItemModalForm: React.FC<Props & FormikProps<OrderItem>> = ({
  orderItem,
  onCancel,
  submitForm,
}) => {
  return (
    <IonModal isOpen mode="ios" onDidDismiss={onCancel}>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>{orderItem ? 'Edit' : 'Add'} Order Item</IonLabel>
          </IonListHeader>

          <Field
            name="description"
            component={FormikTextarea}
            type="text"
            label="Description"
            rows={4}
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

      <IonFooter mode="ios">
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

  validationSchema: Yup.object().shape({
    description: Yup.string().required('Description is required'),
    quantity: Yup.number()
      .required('Quantity is required')
      .moreThan(0, 'Quantity is invalid'),
  }),

  mapPropsToValues({ orderItem }: Props): OrderItem {
    return orderItem ?? DEFAULT_ORDER_ITEM
  },

  handleSubmit(
    values: OrderItem,
    { props: { onSubmit } }: FormikBag<Props, OrderItem>
  ) {
    onSubmit(values)
  },
})(OrderItemModalForm)
