import React, { useState } from 'react'

import {
  OrderThrough,
  Order,
  MainOrderFormValues,
  ExternalOrderFormValues,
  ItemsFormValues,
} from '../types'
import MainOrderForm from '../components/forms/MainOrderForm'
import ItemsForm from '../components/forms/ItemsForm'
import ExternalOrderForm from '../components/forms/ExternalOrderForm'

export default function Home() {
  const [values, setValues] = useState<Order>({
    pickupAddress: '',
    deliveryAddress: '',
    vehicleType: 'car',
    lastestDeliverByTime: '',
    jobName: '',
    orderThrough: OrderThrough.SupplyHound,
    externalOrderId: '',
  })
  const [step, setStep] = useState(0)

  const handleSubmit = (
    newValues: MainOrderFormValues | ExternalOrderFormValues | ItemsFormValues
  ) => {
    if (step === 0) {
      setValues({ ...values, ...newValues })

      setStep(step + 1)
    } else {
      // TODO: Handle submit
      console.log('submit', newValues)
    }
  }

  const renderForm = () => {
    if (step === 0) {
      return <MainOrderForm defaultValues={values} onSubmit={handleSubmit} />
    }

    if (values.orderThrough === OrderThrough.SupplyHound) {
      return <ItemsForm defaultValues={values} onSubmit={handleSubmit} />
    } else {
      return (
        <ExternalOrderForm defaultValues={values} onSubmit={handleSubmit} />
      )
    }
  }

  return renderForm()
}
