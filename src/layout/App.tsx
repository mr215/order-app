import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import {
  HOME_ROUTE,
  LANDING_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
} from 'utils/config'
import useStores from 'hooks/useStores'
import { fetchMarkets as fetchMarketsApi } from 'utils/api'

import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import Landing from 'pages/Landing'
import Home from 'pages/Home'
import OrderItems from 'pages/OrderItems'
import OrderSummary from 'pages/OrderSummary'
import Page from 'pages/Page'

import ProtectedRoute from 'components/auth/ProtectedRoute'
import PublicRoute from 'components/auth/PublicRoute'

import Menu from './Menu'

/* Theme */
import 'theme/app.scss'

const App: React.FC = () => {
  const { marketsStore } = useStores()

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const {
          data: { data },
        } = await fetchMarketsApi()

        marketsStore.markets = data
      } catch (e) {
        // TODO: Handle error
      }
    }

    fetchMarkets()
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Redirect exact from="/" to={LANDING_ROUTE} />

          <PublicRoute exact path={LANDING_ROUTE} component={Landing} />
          <PublicRoute exact path={SIGNUP_ROUTE} component={SignUp} />
          <PublicRoute exact path={LOGIN_ROUTE} component={LogIn} />

          <ProtectedRoute>
            <IonSplitPane contentId="main">
              <Menu />

              <IonRouterOutlet id="main">
                <Route exact path="/page/:name" component={Page} />

                <Route exact path={HOME_ROUTE} component={Home} />
                <Route exact path="/order-items" component={OrderItems} />
                <Route exact path="/order-summary" component={OrderSummary} />
              </IonRouterOutlet>
            </IonSplitPane>
          </ProtectedRoute>
        </Switch>
      </IonReactRouter>
    </IonApp>
  )
}

export default observer(App)
