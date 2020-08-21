import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'

import LogIn from 'pages/LogIn'
import Home from 'pages/Home'
import OrderItems from 'pages/OrderItems'
import Page from 'pages/Page'

import Menu from './Menu'

/* Theme */
import 'theme/app.scss'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Switch>
        {/* TODO: Login routes */}
        <Route exact path="/login" component={LogIn} />

        {/* App page routes */}
        <IonSplitPane contentId="main">
          <Menu />

          <IonRouterOutlet id="main">
            <Route exact path="/home" component={Home} />
            <Route exact path="/order-items" component={OrderItems} />

            <Route exact path="/page/:name" component={Page} />

            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
        </IonSplitPane>
      </Switch>
    </IonReactRouter>
  </IonApp>
)

export default App
