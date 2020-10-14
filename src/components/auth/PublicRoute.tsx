import React from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'
import get from 'lodash/get'

import useStores from 'hooks/useStores'

const PublicRoute: React.FC<RouteProps> = props => {
  const { authStore } = useStores()

  return authStore.token ? (
    <Route
      render={({ location }: RouteComponentProps) => (
        <Redirect to={get(location, ['state', 'from'], '/home')} />
      )}
    />
  ) : (
    <Route {...props} />
  )
}

export default PublicRoute
