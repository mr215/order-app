import React, { useState, useMemo } from 'react'
import {
  withFormik,
  FormikProps,
  FormikBag,
  Field,
  FieldArray,
  getIn,
} from 'formik'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react'
import * as Yup from 'yup'

import OrderItemField from './OrderItemField'
import OrderItemModalForm from './OrderItemModalForm'

import { OrderThrough, Order, OrderItem, OrderItemsFormValues } from 'types'
import FormikInput from './fields/FormikInput'

interface OrderItemsFormProps {
  order: Order
  onSubmit: (values: OrderItemsFormValues) => void
}

const OrderItemsForm: React.FC<
  OrderItemsFormProps & FormikProps<OrderItemsFormValues>
> = ({ order, values, errors, isValid, setFieldValue, submitForm }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [orderItemIndexInEdit, setOrderItemIndexInEdit] = useState<number>(-1)
  const orderItemInEdit = useMemo(
    () =>
      orderItemIndexInEdit > -1 ? values.items[orderItemIndexInEdit] : null,
    [values.items, orderItemIndexInEdit]
  )

  const renderOrderId = () => (
    <Field
      name="orderId"
      component={FormikInput}
      type="text"
      label="Order/PO #"
    />
  )

  const handleEdit = (index: number) => {
    setOrderItemIndexInEdit(index)

    setShowModal(true)
  }

  const handleEditCancel = () => {
    setShowModal(false)
  }

  const handleEditSubmit = (newOrderItem: OrderItem) => {
    if (orderItemIndexInEdit > -1) {
      setFieldValue(`items[${orderItemIndexInEdit}]`, newOrderItem)
    } else {
      setFieldValue('items', [...values.items, newOrderItem])
    }

    setShowModal(false)
  }

  const renderOrderItems = () => (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>Order Items</IonLabel>
        </IonListHeader>

        <FieldArray
          name="items"
          render={helpers => (
            <>
              {(values.items || []).map(
                (orderItem: OrderItem, index: number) => {
                  const name = `items[${index}]`
                  const itemErrors = getIn(errors, name) || {}

                  return (
                    <OrderItemField
                      key={index}
                      orderItem={orderItem}
                      errors={itemErrors}
                      onEdit={() => handleEdit(index)}
                      onRemove={() => {
                        if (values.items.length > 1) {
                          helpers.remove(index)
                        }
                      }}
                    />
                  )
                }
              )}

              <IonItem detail={false} lines="none">
                <IonButton slot="end" onClick={() => handleEdit(-1)}>
                  Add order item
                </IonButton>
              </IonItem>
            </>
          )}
        />
      </IonList>

      {showModal && (
        <OrderItemModalForm
          orderItem={orderItemInEdit}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
        />
      )}
    </>
  )

  return (
    <>
      <IonContent>
        {order.orderThrough === OrderThrough.Supplier
          ? renderOrderId()
          : renderOrderItems()}
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
