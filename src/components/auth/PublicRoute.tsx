import React from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import get from 'lodash/get'

import { HOME_ROUTE } from 'utils/config'
import useStores from 'hooks/useStores'

const PublicRoute: React.FC<RouteProps> = props => {
  const { appStore } = useStores()

  return appStore.token ? (
    <Route
      render={({ location }: RouteComponentProps) => (
        <Redirect to={get(location, ['state', 'from'], HOME_ROUTE)} />
      )}
    />
  ) : (
    <Route {...props} />
  )
}

export default observer(PublicRoute)
