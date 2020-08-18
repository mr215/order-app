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

import { OrderItem, DEFAULT_ORDER_ITEM } from 'types'
import FormikInput from './fields/FormikInput'

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
    <IonModal isOpen>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>{orderItem ? 'Edit' : 'Add'} Order Item</IonLabel>
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
