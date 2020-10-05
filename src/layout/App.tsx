import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { observer } from 'mobx-react-lite'

import ProtectedRoute from 'components/auth/ProtectedRoute'
import PublicRoute from 'components/auth/PublicRoute'

import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import Landing from 'pages/Landing'
import Home from 'pages/Home'
import OrderItems from 'pages/OrderItems'
import OrderSummary from 'pages/OrderSummary'
import Page from 'pages/Page'

import Menu from './Menu'

/* Theme */
import 'theme/app.scss'

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Redirect exact from="/" to="/landing" />

          <Route exact path="/landing" component={Landing} />
          <PublicRoute exact path="/signup" component={SignUp} />
          <PublicRoute exact path="/login" component={LogIn} />

          <ProtectedRoute>
            <IonSplitPane contentId="main">
              <Menu />

              <IonRouterOutlet id="main">
                <Route exact path="/page/:name" component={Page} />

                <Route exact path="/home" component={Home} />
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
