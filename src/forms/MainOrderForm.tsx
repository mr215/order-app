import React, { useState } from 'react'
import styled from 'styled-components'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonButton, IonContent, IonFooter } from '@ionic/react'
import { formatISO } from 'date-fns'
import * as Yup from 'yup'

import { OrderThrough, VehicleType, Order, MainOrderFormValues } from 'types'
import { titleCase } from 'utils/formatters'

import carImg from 'images/car.png'
import truckImg from 'images/truck.png'

import FormikDatetime from './fields/FormikDatetime'
import FormikInput from './fields/FormikInput'
import FormikRadioGroup from './fields/FormikRadioGroup'
import FormikAddress from './fields/FormikAddress'
import SupplierSelectionModal from './SupplierSelectionModal'
import PickupNoteModalForm from './PickupNoteModalForm'
import DeliveryNoteModalForm from './DeliveryNoteModalForm'
import FavoriteLocationsModal from './FavoriteLocationsModal'

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

const MainOrderForm: React.FC<
  MainOrderFormProps & FormikProps<MainOrderFormValues>
> = ({ isValid, submitForm, setFieldValue }) => {
  const [showPickupNote, setShowPickupNote] = useState<boolean>(false)
  const [showDeliveryNote, setShowDeliveryNote] = useState<boolean>(false)
  const [showSupplierSelection, setShowSupplierSelection] = useState<boolean>(
    false
  )
  const [showFavoriteLocations, setShowFavoriteLocations] = useState<boolean>(
    false
  )

  const handleLocationSelect = (address: string) => {
    setFieldValue('deliveryAddress', address)

    setShowFavoriteLocations(false)
  }

  const handleSupplierSelect = (address: string) => {
    setFieldValue('pickupAddress', address)

    setShowSupplierSelection(false)
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
          component={FormikAddress}
          type="text"
          label="Pick up From"
          placeholder="Search pickup address"
          extraContent={
            <IonButton slot="end" onClick={() => setShowPickupNote(true)}>
              Add Pickup Note
            </IonButton>
          }
          selectionContent={
            <IonButton
              slot="start"
              onClick={() => setShowSupplierSelection(true)}
            >
              Select
            </IonButton>
          }
          required
        />

        <Field
          name="deliveryAddress"
          component={FormikAddress}
          type="text"
          label="Deliver To"
          placeholder="Search delivery address"
          extraContent={
            <IonButton slot="end" onClick={() => setShowDeliveryNote(true)}>
              Add Delivery Note
            </IonButton>
          }
          selectionContent={
            <IonButton
              slot="start"
              onClick={() => setShowFavoriteLocations(true)}
            >
              Favorites
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

      {/* Modals */}
      {showPickupNote && (
        <PickupNoteModalForm onCancel={() => setShowPickupNote(false)} />
      )}

      {showDeliveryNote && (
        <DeliveryNoteModalForm onCancel={() => setShowDeliveryNote(false)} />
      )}

      {showSupplierSelection && (
        <SupplierSelectionModal
          onCancel={() => setShowSupplierSelection(false)}
          onClick={handleSupplierSelect}
        />
      )}

      {showFavoriteLocations && (
        <FavoriteLocationsModal
          onCancel={() => setShowFavoriteLocations(false)}
          onClick={handleLocationSelect}
        />
      )}
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
