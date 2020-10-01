import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonButton, IonContent } from '@ionic/react'
import { formatISO } from 'date-fns'
import * as Yup from 'yup'

import {
  OrderThrough,
  VehicleType,
  Order,
  Supplier,
  MainOrderFormValues,
} from 'types'
import { titleCase } from 'utils/formatters'
import FooterWithButton from 'components/FooterWithButton'

import carImg from 'images/car.png'
import truckImg from 'images/truck.png'

import FormikDatetime from './fields/FormikDatetime'
import FormikInput from './fields/FormikInput'
import FormikRadioGroup from './fields/FormikRadioGroup'
import FormikAddress from './fields/FormikAddress'

import PickupNoteModal from './modals/PickupNoteModal'
import DeliveryNoteModal from './modals/DeliveryNoteModal'
import SuppliersModal from './modals/SuppliersModal'

import FavoriteAddresssModal from './modals/FavoriteAddressesModal'

interface MainOrderFormProps {
  favoriteAddresses: string[]
  suppliers: Supplier[]
  order: Order
  onFavoriteAddress: (address: string) => void
  onUnfavoriteAddress: (address: string) => void
  onSubmit: (values: MainOrderFormValues) => void
}

const NOW = formatISO(new Date())

const VehicleImg = styled.img<{ small?: boolean }>`
  width: auto;
  height: 3rem;
  margin: 0.5rem 1rem 0.5rem 0;
  ${props => (props.small ? `transform: scale(0.9);` : '')}
`

const AddressButton = styled(IonButton)`
  width: 5rem;
`

const MainOrderForm: React.FC<
  MainOrderFormProps & FormikProps<MainOrderFormValues>
> = ({
  favoriteAddresses,
  suppliers,
  onFavoriteAddress,
  onUnfavoriteAddress,

  // Formik
  isValid,
  values,
  submitForm,
  setFieldValue,
}) => {
  const [showPickupNoteModal, setShowPickupNoteModal] = useState<boolean>(false)
  const [showDeliveryNoteModal, setShowDeliveryNoteModal] = useState<boolean>(
    false
  )
  const [showSuppliersModal, setShowSuppliersModal] = useState<boolean>(false)
  const [showFavoriteAddressesModal, setShowFavoriteAddresses] = useState<
    boolean
  >(false)

  const isDeliveryAddressFavorite = useMemo(
    () =>
      !!favoriteAddresses.find(
        (address: string) =>
          address.toLowerCase() === values.deliveryAddress.toLowerCase()
      ),
    [favoriteAddresses, values.deliveryAddress]
  )

  const favoriteAddressButton = useMemo(() => {
    if (!values.deliveryAddress || isDeliveryAddressFavorite) {
      return (
        <AddressButton
          slot="start"
          size="default"
          onClick={() => setShowFavoriteAddresses(true)}
        >
          Favorites
        </AddressButton>
      )
    }

    return (
      <AddressButton
        slot="start"
        size="default"
        onClick={() => onFavoriteAddress(values.deliveryAddress)}
      >
        Save
      </AddressButton>
    )
  }, [isDeliveryAddressFavorite, values.deliveryAddress, onFavoriteAddress])

  const handleFavoriteAddressSelect = (address: string) => {
    setFieldValue('deliveryAddress', address)

    setShowFavoriteAddresses(false)
  }

  const handleSupplierSelect = (address: string) => {
    setFieldValue('pickupAddress', address)

    setShowSuppliersModal(false)
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
              label: 'Yes please - help me save more time!',
              value: OrderThrough.SupplyHound,
            },
            {
              label: "No thanks, I'll call it in myself",
              value: OrderThrough.Supplier,
            },
          ]}
        />

        <Field
          name="pickupAddress"
          component={FormikAddress}
          type="text"
          label="Pickup From"
          placeholder="Search pickup address"
          required
          extraHeader={
            <IonButton
              slot="end"
              size="default"
              onClick={() => setShowPickupNoteModal(true)}
            >
              Pickup Note
            </IonButton>
          }
          extraContent={
            <AddressButton
              slot="start"
              size="default"
              onClick={() => setShowSuppliersModal(true)}
            >
              Select
            </AddressButton>
          }
        />

        <Field
          name="deliveryAddress"
          component={FormikAddress}
          type="text"
          label="Deliver To"
          placeholder="Search delivery address"
          required
          extraHeader={
            <IonButton
              slot="end"
              size="default"
              onClick={() => setShowDeliveryNoteModal(true)}
            >
              Delivery Note
            </IonButton>
          }
          extraContent={favoriteAddressButton}
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
          name="lastestDeliverBy"
          component={FormikDatetime}
          label="Latest Deliver By"
          required
          min={NOW}
          displayFormat="DDD MMM D h:mm A"
          minuteValues={[0, 15, 30, 45]}
        />
      </IonContent>

      <FooterWithButton disabled={!isValid} onClick={submitForm}>
        Continue
      </FooterWithButton>

      {/* Modals */}
      <PickupNoteModal
        isOpen={showPickupNoteModal}
        onClose={() => setShowPickupNoteModal(false)}
      />

      <DeliveryNoteModal
        isOpen={showDeliveryNoteModal}
        onClose={() => setShowDeliveryNoteModal(false)}
      />

      <SuppliersModal
        isOpen={showSuppliersModal}
        suppliers={suppliers}
        onSelect={handleSupplierSelect}
        onClose={() => setShowSuppliersModal(false)}
      />

      <FavoriteAddresssModal
        isOpen={showFavoriteAddressesModal}
        favoriteAddresses={favoriteAddresses}
        onRemove={onUnfavoriteAddress}
        onSelect={handleFavoriteAddressSelect}
        onClose={() => setShowFavoriteAddresses(false)}
      />
    </>
  )
}

export default withFormik<MainOrderFormProps, MainOrderFormValues>({
  displayName: 'MainOrderForm',
  enableReinitialize: true,

  validationSchema: Yup.object().shape({
    jobName: Yup.string().required('Required'),
    orderThrough: Yup.mixed()
      .required()
      .oneOf([OrderThrough.SupplyHound, OrderThrough.Supplier] as const),
    pickupAddress: Yup.string().required('Required'),
    deliveryAddress: Yup.string().required('Required'),
    vehicleType: Yup.mixed()
      .required()
      .oneOf([VehicleType.Car, VehicleType.Truck] as const),
    lastestDeliverBy: Yup.string().required('Required'),
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
