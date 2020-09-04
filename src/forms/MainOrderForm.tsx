import React from 'react'
import styled from 'styled-components'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
} from '@ionic/react'
import { formatISO } from 'date-fns'
import * as Yup from 'yup'

import { OrderThrough, VehicleType, Order, MainOrderFormValues } from 'types'
import { titleCase } from 'utils/formatters'

import carImg from 'images/car.png'
import truckImg from 'images/truck.png'

import FormikDatetime from './fields/FormikDatetime'
import FormikInput from './fields/FormikInput'
import FormikRadioGroup from './fields/FormikRadioGroup'
import FormikTextarea from './fields/FormikTextarea'

interface MainOrderFormProps {
  order: Order
  onSubmit: (values: MainOrderFormValues) => void
}

const TODAY = formatISO(new Date(), { representation: 'date' })

const VehicleImg = styled.img<{ small?: boolean }>`
  width: auto;
  height: 3rem;
  margin: 0.5rem 1rem 0.5rem 0;
  ${props => (props.small ? `transform: scale(0.9);` : '')}
`

const ModalTitle = styled.h1`
  text-align: center;
  margin: 1rem 0;
`

const MainOrderForm: React.FC<
  MainOrderFormProps & FormikProps<MainOrderFormValues>
> = ({ isValid, submitForm }) => {
  const [openPickupNote, setOpenPickupNote] = React.useState(false)
  const [openDeliveryNote, setOpenDeliveryNote] = React.useState(false)

  const togglePickupNote = () => {
    setOpenPickupNote(!openPickupNote)
  }

  const toggleDeliveryNote = () => {
    setOpenDeliveryNote(!openDeliveryNote)
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
          formatter={titleCase}
          required
        />

        <Field
          name="orderThrough"
          component={FormikRadioGroup}
          label="Submit a list of materials to your supplier through SupplyHound?"
          radioProps={{ slot: 'start', mode: 'md' }}
          items={[
            {
              label: 'Yes please -  help me save more time',
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
          placeholder="Search pickup address"
          extraContent={
            <IonButton slot="end" onClick={togglePickupNote}>
              Note
            </IonButton>
          }
          required
        />

        <Field
          name="deliveryAddress"
          component={FormikInput}
          type="text"
          label="Deliver To"
          placeholder="Search delivery address"
          extraContent={
            <IonButton slot="end" onClick={toggleDeliveryNote}>
              Note
            </IonButton>
          }
          required
        />

        <Field
          name="vehicleType"
          component={FormikRadioGroup}
          label="Vehicle Type"
          horizontal
          radioProps={{ slot: 'start', mode: 'md' }}
          items={[
            {
              label: <VehicleImg src={truckImg} alt="truck" />,
              value: VehicleType.Truck,
            },
            {
              label: <VehicleImg src={carImg} alt="car" small />,
              value: VehicleType.Car,
            },
          ]}
        />

        <Field
          name="lastestDeliverByTime"
          component={FormikDatetime}
          label="Latest Deliver By"
          required
          min={TODAY}
          displayFormat="DDD MMM D h:mm A"
          minuteValues={[0, 15, 30, 45]}
        />
      </IonContent>

      <IonFooter mode="ios" className="ion-padding ion-no-border">
        <IonButton expand="block" disabled={!isValid} onClick={submitForm}>
          Continue
        </IonButton>
      </IonFooter>

      <IonModal isOpen={openPickupNote}>
        <IonHeader>
          <ModalTitle>Pickup Note</ModalTitle>
        </IonHeader>

        <IonContent>
          <Field
            name="pickupNote"
            component={FormikTextarea}
            label="Pickup Note"
            placeholder="For example: Go to tool counter in back. Picking up compressor, replacement hose and 3 boxes of nails."
            rows={4}
          />
        </IonContent>

        <IonFooter>
          <IonButton expand="block" onClick={togglePickupNote}>
            Save
          </IonButton>
        </IonFooter>
      </IonModal>

      {/* Modals */}
      <IonModal isOpen={openDeliveryNote}>
        <IonHeader>
          <ModalTitle>Delivery Note</ModalTitle>
        </IonHeader>

        <IonContent>
          <Field
            name="deliveryNote.contact"
            component={FormikInput}
            type="text"
            label="Contact Name"
            placeholder="Enter contact's name"
            formatter={titleCase}
          />

          <Field
            name="deliveryNote.phone"
            component={FormikInput}
            type="tel"
            label="Contact Phone Number"
            placeholder="Enter contact's phone number"
            mask="(999)-999-9999"
          />

          <Field
            name="deliveryNote.note"
            component={FormikTextarea}
            label="Delivery Note"
            placeholder="For example: Call when 30 minutes out. Go to back of building."
            rows={4}
          />
        </IonContent>

        <IonFooter>
          <IonButton expand="block" onClick={toggleDeliveryNote}>
            Save
          </IonButton>
        </IonFooter>
      </IonModal>
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
