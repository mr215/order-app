import React from 'react'
import styled from 'styled-components'
import {
  withFormik,
  FormikProps,
  FormikBag,
  Field,
  FieldArray,
  getIn,
} from 'formik'
import { IonButton, IonContent, IonFooter } from '@ionic/react'
import * as Yup from 'yup'

import OrderItemField from './components/OrderItemField'

import {
  OrderThrough,
  Order,
  OrderItem,
  OrderItemsFormValues,
  DEFAULT_ORDER_ITEM,
} from 'types'
import FormikInput from './fields/FormikInput'

interface OrderItemsFormProps {
  order: Order
  onSubmit: (values: OrderItemsFormValues) => void
}

const OrderItemsForm: React.FC<
  OrderItemsFormProps & FormikProps<OrderItemsFormValues>
> = ({ order, values, errors, isValid, submitForm }) => {
  return (
    <>
      <IonContent>
        {order.orderThrough === OrderThrough.Supplier ? (
          <Field
            name="orderId"
            component={FormikInput}
            type="text"
            label="Order/PO #"
          />
        ) : (
          <FieldArray
            name="items"
            render={helpers => (
              <>
                {(values.items || []).map(
                  (orderItem: OrderItem, index: number) => {
                    const name = `items[${index}]`
                    const itemErrors = Object.values(
                      getIn(errors, name) || {}
                    ) as string[]

                    return (
                      <OrderItemField
                        key={index}
                        orderItem={orderItem}
                        errors={itemErrors}
                        onChange={() => {}}
                        onRemove={() => {
                          if (values.items.length > 1) {
                            helpers.remove(index)
                          }
                        }}
                      />
                    )
                  }
                )}
              </>
            )}
          />
        )}
      </IonContent>

      <IonFooter className="ion-padding ion-no-border">
        <IonButton expand="block" disabled={!isValid} onClick={submitForm}>
          Continue
        </IonButton>
      </IonFooter>
    </>
  )
}

export default withFormik<OrderItemsFormProps, OrderItemsFormValues>({
  displayName: 'OrderItemsForm',
  enableReinitialize: true,

  validationSchema: ({ order }: OrderItemsFormProps) => {
    const orderIdSchema = Yup.object().shape({
      orderId: Yup.string().required('Order No. is required'),
    })

    const itemsSchema = Yup.object().shape({
      items: Yup.array()
        .of(
          Yup.object().shape({
            description: Yup.string().required('Description is required'),
            quantity: Yup.number()
              .required('Quantity is required')
              .moreThan(0, 'Quantity is invalid'),
          })
        )
        .required('Order items are required')
        .min(1, 'Order must have mininum of 1 item'),
    })

    return order.orderThrough === OrderThrough.Supplier
      ? orderIdSchema
      : itemsSchema
  },

  mapPropsToValues({ order }: OrderItemsFormProps): OrderItemsFormValues {
    return order as OrderItemsFormValues
  },

  handleSubmit(
    values: OrderItemsFormValues,
    {
      props: { onSubmit },
      setSubmitting,
    }: FormikBag<OrderItemsFormProps, OrderItemsFormValues>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(OrderItemsForm)