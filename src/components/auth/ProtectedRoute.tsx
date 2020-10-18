import React from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'

import { LANDING_ROUTE } from 'utils/config'
import useStores from 'hooks/useStores'

const ProtectedRoute: React.FC<RouteProps> = props => {
  const { authStore } = useStores()

  return authStore.token ? (
    <Route {...props} />
  ) : (
    <Route
      render={({ location }: RouteComponentProps) => (
        <Redirect to={{ pathname: LANDING_ROUTE, state: { from: location } }} />
      )}
    />
  )
}

export default ProtectedRoute
