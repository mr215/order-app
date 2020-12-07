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
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react'
import * as Yup from 'yup'

import {
  DEFAULT_ORDER_ITEM,
  Order,
  OrderItem,
  OrderItemsFormValues,
} from 'types'

import FooterWithButton from 'components/FooterWithButton'

import FormikInput from './fields/FormikInput'
import OrderItemRow from './components/OrderItemRow'

import OrderItemModalForm from './OrderItemModalForm'

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
      name="order_no"
      component={FormikInput}
      type="text"
      label="Order/PO #"
      placeholder="Enter order #, PO # or Will Call"
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
      <IonList mode="ios">
        <IonListHeader>
          <IonLabel>Create List</IonLabel>
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
                    <OrderItemRow
                      key={index}
                      orderItem={orderItem}
                      errors={itemErrors}
                      onEdit={() => handleEdit(index)}
                      onRemove={() => {
                        if (values.items.length > 1) {
                          helpers.remove(index)
                        } else {
                          helpers.replace(0, DEFAULT_ORDER_ITEM)
                        }
                      }}
                    />
                  )
                }
              )}

              <IonItem detail={false} lines="none">
                <IonButton
                  slot="end"
                  size="default"
                  onClick={() => handleEdit(-1)}
                >
                  Add Order Item
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
        {order.ordered_directly ? renderOrderId() : renderOrderItems()}
      </IonContent>

      <FooterWithButton disabled={!isValid} onClick={submitForm}>
        Continue
      </FooterWithButton>
    </>
  )
}

export default withFormik<OrderItemsFormProps, OrderItemsFormValues>({
  displayName: 'OrderItemsForm',
  enableReinitialize: true,

  validationSchema: ({ order }: OrderItemsFormProps) => {
    const orderIdSchema = Yup.object().shape({
      order_no: Yup.string().required('Order No. is required'),
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

    return order.ordered_directly ? orderIdSchema : itemsSchema
  },

  mapPropsToValues({ order }: OrderItemsFormProps): OrderItemsFormValues {
    return order as OrderItemsFormValues
  },

  handleSubmit(
    values: OrderItemsFormValues,
    {
      props: { onSubmit },
      setSubmitting,
      resetForm,
    }: FormikBag<OrderItemsFormProps, OrderItemsFormValues>
  ) {
    onSubmit(values)
    setSubmitting(false)

    // Reset
    resetForm()
  },
})(OrderItemsForm)
