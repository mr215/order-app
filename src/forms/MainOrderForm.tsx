import React from 'react'
import styled from 'styled-components'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonButton, IonContent, IonFooter, IonModal } from '@ionic/react'
import { formatISO } from 'date-fns'

import * as Yup from 'yup'

import { OrderThrough, VehicleType, Order, MainOrderFormValues } from 'types'
import FormikDatetime from './fields/FormikDatetime'
import FormikInput from './fields/FormikInput'
import FormikRadioGroup from './fields/FormikRadioGroup'

import carImg from 'images/car.png'
import truckImg from 'images/truck.png'

import FormikTextarea from './fields/FormikTextarea'
import FormikAutocomplete from './fields/FormikAutocomplete'

interface MainOrderFormProps {
  order: Order
  onSubmit: (values: MainOrderFormValues) => void
  onChange: (value: string) => void
  onSelect: (value: string) => void
}

const VehicleImg = styled.img`
  width: auto;
  height: ${(props: { height?: string }) => props.height ?? '2rem'};
`

const MainOrderForm: React.FC<
  MainOrderFormProps & FormikProps<MainOrderFormValues>
> = ({ order, isValid, submitForm, onChange, onSelect }) => {
  const today = formatISO(new Date(), { representation: 'date' })

  const [openPickupNotes, updateOpenPickupNotes] = React.useState(false)

  const [openDeliveryNotes, updateOpenDeliveryNotes] = React.useState(false)

  const showPickupNotes = () => {
    updateOpenPickupNotes(!openPickupNotes)
  }

  const showDeliveryNotes = () => {
    updateOpenDeliveryNotes(!openDeliveryNotes)
  }

  return (
    <>
      <IonContent>
        <Field
          name="jobName"
          component={FormikInput}
          type="text"
          label="Job Name"
          placeholder="Enter job name"
          required
        />

        <Field
          name="orderThrough"
          component={FormikRadioGroup}
          label="Submit a list to your supplier through SupplyHound?"
          radioProps={{ slot: 'start', mode: 'md' }}
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
          component={FormikAutocomplete}
          type="text"
          label="Pick up From"
          placeholder="Enter pickup address"
          required
        />

        <IonModal isOpen={openPickupNotes}>
          <Field 
            name="pickupNote"
            component={FormikTextarea}
            type="text"
            label="Pickup Notes"
            placeholder="Enter relevant pickup notes"
          />
          <IonButton onClick={showPickupNotes}>
            Close
          </IonButton>
        </IonModal>

        <IonButton onClick={showPickupNotes}>
          Enter Pickup Notes
        </IonButton>

        <Field
          name="deliveryAddress"
          component={FormikAutocomplete}
          type="text"
          label="Deliver To"
          placeholder="Enter delivery address"
          required
        />
        
        <IonModal isOpen={openDeliveryNotes}>
          <IonContent>
          <Field 
            name="deliveryNote.contact"
            component={FormikInput}
            type="text"
            label="Contact Name"
            placeholder="Enter contact's name"
          />
          <Field 
            name="deliveryNote.phone"
            component={FormikInput}
            type="text"
            label="Contact Phone Number"
            placeholder="Enter contact's phone number"
          />
          <Field 
            name="deliveryNote.notes"
            component={FormikTextarea}
            type="text"
            label="Delivery Notes"
            placeholder="Enter relevant delivery notes"
          />
          </IonContent>
          <IonButton onClick={showDeliveryNotes}>
            Close
          </IonButton>
        </IonModal>
        
        <IonButton onClick={showDeliveryNotes}>
          Enter Delivery Notes
        </IonButton>

        <Field
          name="vehicleType"
          component={FormikRadioGroup}
          label="Vehicle Type"
          radioProps={{ slot: 'start', mode: 'md' }}
          items={[
            {
              label: <VehicleImg src={truckImg} alt="truck" />,
              value: VehicleType.Truck,
            },
            {
              label: <VehicleImg src={carImg} alt="car" height="1.8rem" />,
              value: VehicleType.Car,
            },
          ]}
        />

        <Field
          name="lastestDeliverByTime"
          component={FormikDatetime}
          label="Latest Deliver By"
          required
          min={today}
          displayFormat="DDD MMM D h:mm A"
          minuteValues={[0, 15, 30, 45]}
        />
      </IonContent>

      <IonFooter mode="ios" className="ion-padding ion-no-border">
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
