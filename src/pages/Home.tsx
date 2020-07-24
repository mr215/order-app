import React, { useState } from 'react'

import OrderForm, { OrderFormValues } from '../components/forms/OrderForm'

export default function Home() {
  const [values, setValues] = useState<OrderFormValues>({
    pickupAddress: '',
    deliveryAddress: '',
    vehicleType: 'car',
    lastestDeliverByTime: '2017-05-24T10:30',
    jobName: '',
    orderThrough: '',
  })

  const handleSubmit = (values: OrderFormValues) => {
    // TODO:
  }

  return <OrderForm defaultValues={values} onSubmit={handleSubmit} />
}
