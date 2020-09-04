import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'

import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import Home from 'pages/Home'
import OrderItems from 'pages/OrderItems'
import PaymentSummary from 'pages/PaymentSummary'

import Page from 'pages/Page'

import Menu from './Menu'

/* Theme */
import 'theme/app.scss'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Switch>
        {/* App page routes */}
        <IonSplitPane contentId="main">
          <Menu />

          <IonRouterOutlet id="main">
            <Route exact path="/home" component={Home} />
            <Route exact path="/order-items" component={OrderItems} />

            <Route exact path="/payment-summary" component={PaymentSummary} />

            <Route exact path="/page/:name" component={Page} />

            <Route exact path="/new" component={SignUp} />
            <Route exact path="/login" component={LogIn} />

            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
        </IonSplitPane>
      </Switch>
    </IonReactRouter>
  </IonApp>
)

export default App
