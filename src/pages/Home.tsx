import React, { useState } from 'react'

import { Order } from '../types'
import OrderForm from '../components/forms/OrderForm'

export default function Home() {
  const [values, setValues] = useState<Order>({
    pickupAddress: '',
    deliveryAddress: '',
    vehicleType: 'car',
    lastestDeliverByTime: '2017-05-24T10:30',
    jobName: '',
    orderThrough: '',
  })

  const handleSubmit = (values: Order) => {
    // TODO:
  }

  return <OrderForm defaultValues={values} onSubmit={handleSubmit} />
}
