import React from 'react'
import styled from 'styled-components'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonButton, IonContent, IonFooter, IonImg } from '@ionic/react'

import * as Yup from 'yup'

import { OrderThrough, VehicleType, Order, MainOrderFormValues } from 'types'
import FormikDatetime from './fields/FormikDatetime'
import FormikInput from './fields/FormikInput'
import FormikRadioGroup from './fields/FormikRadioGroup'

import carImg from 'images/car.png'
import truckImg from 'images/truck.png'

interface MainOrderFormProps {
  order: Order
  onSubmit: (values: MainOrderFormValues) => void
}

const VehicleImg = styled(IonImg)`
  ::part(image) {
    width: auto;
    height: 2rem;
  }
`

const MainOrderForm: React.FC<
  MainOrderFormProps & FormikProps<MainOrderFormValues>
> = ({ isValid, submitForm }) => {
  return (
    <>
      <IonContent>
        <Field
          name="jobName"
          component={FormikInput}
          type="text"
          label="Job Name"
          required
        />

        <Field
          name="orderThrough"
          component={FormikRadioGroup}
          label="Submit a list to your supplier through SupplyHound?"
          slot="end"
          items={[
            {
              label: 'Yes',
              value: OrderThrough.SupplyHound,
            },
            {
              label: "No thanks, I'll call in myself",
              value: OrderThrough.Supplier,
            },
          ]}
        />

        <Field
          name="pickupAddress"
          component={FormikInput}
          type="text"
          label="Pick up From"
          required
        />

        <Field
          name="deliveryAddress"
          component={FormikInput}
          type="text"
          label="Deliver To"
          required
        />

        <Field
          name="vehicleType"
          component={FormikRadioGroup}
          label="Vehicle Type"
          slot="end"
          items={[
            {
              label: <VehicleImg src={carImg} alt="car" />,
              value: VehicleType.Car,
            },
            {
              label: <VehicleImg src={truckImg} alt="truck" />,
              value: VehicleType.Truck,
            },
          ]}
        />

        <Field
          name="lastestDeliverByTime"
          component={FormikDatetime}
          label="Latest Deliver By"
          required
          min="2020-08-17"
          displayFormat="DDD MMM D h:mm A"
          minuteValues={[0, 15, 30, 45]}
        />
      </IonContent>

      <IonFooter className="ion-padding ion-no-border">
        <IonButton expand="block" disabled={!isValid} onClick={submitForm}>
          Continue
        </IonButton>
      </IonFooter>
    </>
  )
}

export default withFormik<MainOrderFormProps, MainOrderFormValues>({
  displayName: 'MainOrderForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    jobName: Yup.string().required('Job name is required'),
    orderThrough: Yup.mixed()
      .required()
      .oneOf([OrderThrough.SupplyHound, OrderThrough.Supplier] as const),
    pickupAddress: Yup.string().required('Pickup address is required'),
    deliveryAddress: Yup.string().required('Delivery address is required'),
    vehicleType: Yup.mixed()
      .required()
      .oneOf([VehicleType.Car, VehicleType.Truck] as const),
    lastestDeliverByTime: Yup.string().required('Delivery time is required'),
  }),

  mapPropsToValues({ order }: MainOrderFormProps): MainOrderFormValues {
    return order as MainOrderFormValues
  },

  handleSubmit(
    values: MainOrderFormValues,
    {
      props: { onSubmit },
      setSubmitting,
    }: FormikBag<MainOrderFormProps, MainOrderFormValues>
  ) {
    onSubmit(values)

    setSubmitting(false)
  },
})(MainOrderForm)