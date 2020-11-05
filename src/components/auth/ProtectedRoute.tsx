import React from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { LANDING_ROUTE } from 'utils/config'
import useStores from 'hooks/useStores'

const ProtectedRoute: React.FC<RouteProps> = props => {
  const { appStore } = useStores()

  return appStore.token ? (
    <Route {...props} />
  ) : (
    <Route
      render={({ location }: RouteComponentProps) => (
        <Redirect to={{ pathname: LANDING_ROUTE, state: { from: location } }} />
      )}
    />
  )
}

export default observer(ProtectedRoute)
