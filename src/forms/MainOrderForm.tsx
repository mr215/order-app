import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { withFormik, FormikProps, FormikBag, Field } from 'formik'
import { IonButton, IonContent, IonIcon, IonLabel } from '@ionic/react'
import { pencilSharp } from 'ionicons/icons'
import { formatISO } from 'date-fns'
import * as Yup from 'yup'
import flowRight from 'lodash/fp/flowRight'

import useStores from 'hooks/useStores'
import { OrderThrough, VehicleType, Order, MainOrderFormValues } from 'types'
import {
  fetchFavoriteAddresses as fetchFavoriteAddressesApi,
  addFavoriteAddress as addFavoriteAddressApi,
} from 'utils/api'
import { titleCase } from 'utils/formatters'
import FooterWithButton from 'components/FooterWithButton'

import carImg from 'images/car.png'
import truckImg from 'images/truck.png'

import FormikDatetime from './fields/FormikDatetime'
import FormikInput from './fields/FormikInput'
import FormikRadioGroup from './fields/FormikRadioGroup'
import FormikAddress from './fields/FormikAddress'

import PickupNotesModal from './modals/PickupNotesModal'
import DeliveryNotesModal from './modals/DeliveryNotesModal'
import SuppliersModal from './modals/SuppliersModal'

import FavoriteAddresssModal from './modals/FavoriteAddressesModal'

interface MainOrderFormProps {
  order: Order
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

const NotesButton = styled(IonLabel)`
  --color: var(--ion-color-primary) !important;

  cursor: pointer;
  border-bottom: 1px dotted;
`

const MainOrderForm: React.FC<
  MainOrderFormProps & FormikProps<MainOrderFormValues>
> = ({ isValid, values, submitForm, setFieldValue }) => {
  const [showPickupNotesModal, setShowPickupNotesModal] = useState<boolean>(
    false
  )
  const [showDeliveryNotesModal, setShowDeliveryNotesModal] = useState<boolean>(
    false
  )
  const [showSuppliersModal, setShowSuppliersModal] = useState<boolean>(false)
  const [showFavoriteAddressesModal, setShowFavoriteAddresses] = useState<
    boolean
  >(false)

  const { favoriteAddressesStore } = useStores()

  const makeFavoriteAddressButton = () => {
    const isDeliveryAddressFavorite = favoriteAddressesStore.exists(
      values.deliveryAddress
    )

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
        onClick={() => addFavoriteAddress(values.deliveryAddress)}
      >
        Save
      </AddressButton>
    )
  }

  useEffect(() => {
    const fetcher = async () => {
      const { data } = await fetchFavoriteAddressesApi()

      favoriteAddressesStore.load(data)
    }

    fetcher()
  }, [])

  const addFavoriteAddress = async (address: string) => {
    const { data } = await addFavoriteAddressApi({ address })

    favoriteAddressesStore.add(data)
  }

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
            <NotesButton
              slot="end"
              onClick={() => setShowPickupNotesModal(true)}
            >
              Pickup Notes <IonIcon icon={pencilSharp} />
            </NotesButton>
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
            <NotesButton
              slot="end"
              onClick={() => setShowDeliveryNotesModal(true)}
            >
              Delivery Notes <IonIcon icon={pencilSharp} />
            </NotesButton>
          }
          extraContent={makeFavoriteAddressButton()}
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
      <PickupNotesModal
        isOpen={showPickupNotesModal}
        onClose={() => setShowPickupNotesModal(false)}
      />

      <DeliveryNotesModal
        isOpen={showDeliveryNotesModal}
        onClose={() => setShowDeliveryNotesModal(false)}
      />

      <SuppliersModal
        isOpen={showSuppliersModal}
        onSelect={handleSupplierSelect}
        onClose={() => setShowSuppliersModal(false)}
      />

      <FavoriteAddresssModal
        isOpen={showFavoriteAddressesModal}
        onSelect={handleFavoriteAddressSelect}
        onClose={() => setShowFavoriteAddresses(false)}
      />
    </>
  )
}

export default flowRight(
  withFormik<MainOrderFormProps, MainOrderFormValues>({
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
  }),
  observer
)(MainOrderForm)
