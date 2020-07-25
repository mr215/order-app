import React, { useState } from 'react'

import { Order, OrderThrough } from '../types'
import MainOrderForm from '../components/forms/MainOrderForm'
import ItemsForm from '../components/forms/ItemsForm'
import ExternalOrderForm from '../components/forms/ExternalOrderForm'

export default function Home() {
  const [values, setValues] = useState<Order>({
    pickupAddress: '',
    deliveryAddress: '',
    vehicleType: 'car',
    lastestDeliverByTime: '2017-05-24T10:30',
    jobName: '',
    orderThrough: OrderThrough.SupplyHound,
  })
  const [step, setStep] = useState(0)

  const handleSubmit = (newValues: Order) => {
    if (step === 0) {
      setValues(newValues)

      setStep(step + 1)
    } else {
      // TODO: Handle submit
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
