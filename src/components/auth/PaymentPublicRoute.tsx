import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { HOME_ROUTE } from 'utils/config'
import useStores from 'hooks/useStores'

const PaymentProtectedRoute: React.FC<RouteProps> = props => {
  const { appStore } = useStores()

  if (!appStore.loaded) {
    return null
  }

  return appStore.paymentMethods.length > 0 ? (
    <Redirect to={{ pathname: HOME_ROUTE }} />
  ) : (
    <Route {...props} />
  )
}

export default observer(PaymentProtectedRoute)
