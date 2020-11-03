import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'

import {
  HOME_ROUTE,
  LANDING_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
} from 'utils/config'

import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import Landing from 'pages/Landing'
import Home from 'pages/Home'
import OrderItems from 'pages/OrderItems'
import OrderSummary from 'pages/OrderSummary'
import PaymentSetup from 'pages/PaymentSetup'

import ProtectedRoute from 'components/auth/ProtectedRoute'
import PublicRoute from 'components/auth/PublicRoute'
import PaymentProtectedRoute from 'components/auth/PaymentProtectedRoute'

import Menu from './Menu'

/* Theme */
import 'theme/app.scss'

const App: React.FC = () => {
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
                <PaymentProtectedRoute
                  exact
                  path={HOME_ROUTE}
                  component={Home}
                />
                <PaymentProtectedRoute
                  exact
                  path="/order-items"
                  component={OrderItems}
                />

                <PaymentProtectedRoute
                  exact
                  path="/order-summary"
                  component={OrderSummary}
                />

                <Route exact path="/payment-setup" component={PaymentSetup} />
              </IonRouterOutlet>
            </IonSplitPane>
          </ProtectedRoute>
        </Switch>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
