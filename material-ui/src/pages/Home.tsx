import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { MainOrderFormValues } from 'types'
import OrderContext from 'contexts/OrderContext'

import MainOrderForm from 'components/forms/MainOrderForm'

interface HomeProps extends RouteComponentProps<any> {}

export default function Home({ history }: HomeProps) {
  const { order, updateOrder } = useContext(OrderContext)

  const handleSubmit = (values: MainOrderFormValues) => {
    updateOrder(values)

    setTimeout(() => {
      history.push({ pathname: '/order-items' })
    })
  }

  return <MainOrderForm order={order} onSubmit={handleSubmit} />
}
