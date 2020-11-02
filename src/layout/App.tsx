import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import {
  IonApp,
  IonRouterOutlet,
  IonLoading,
  IonSplitPane,
  IonToast,
} from '@ionic/react'
import { observer } from 'mobx-react-lite'

import {
  HOME_ROUTE,
  LANDING_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  TOAST_DURATION,
} from 'utils/config'
import useStores from 'hooks/useStores'

import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import Landing from 'pages/Landing'
import Home from 'pages/Home'
import OrderItems from 'pages/OrderItems'
import OrderSummary from 'pages/OrderSummary'
import PaymentSetup from 'pages/PaymentSetup'

import ProtectedRoute from 'components/auth/ProtectedRoute'
import PublicRoute from 'components/auth/PublicRoute'

import Menu from './Menu'

/* Theme */
import 'theme/app.scss'

const App: React.FC = () => {
  const { appStore } = useStores()

  return (
    <IonApp>
      {appStore.loading ? (
        <IonLoading isOpen />
      ) : (
        <>
          {appStore.error && (
            <IonToast
              isOpen
              message={appStore.error}
              duration={TOAST_DURATION}
            />
          )}

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
                    <Route exact path={HOME_ROUTE} component={Home} />
                    <Route
                      exact
                      path="/payment-setup"
                      component={PaymentSetup}
                    />
                    <Route exact path="/order-items" component={OrderItems} />
                    <Route
                      exact
                      path="/order-summary"
                      component={OrderSummary}
                    />
                  </IonRouterOutlet>
                </IonSplitPane>
              </ProtectedRoute>
            </Switch>
          </IonReactRouter>
        </>
      )}
    </IonApp>
  )
}

export default observer(App)
