import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import useStores from 'hooks/useStores'

const PaymentProtectedRoute: React.FC<RouteProps> = props => {
  const { appStore } = useStores()

  return appStore.paymentMethods.length > 0 ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/payment-setup' }} />
  )
}

export default PaymentProtectedRoute
