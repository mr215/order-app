import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'

import OrderContextProvider from 'contexts/OrderContextProvider'
import LogIn from 'pages/LogIn'
import Home from 'pages/Home'
import Page from 'pages/Page'

import Menu from './Menu'

/* Theme */
import 'theme/app.scss'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Switch>
        {/* TODO: Login routes */}
        <Route path="/login" component={LogIn} exact />

        {/* App page routes */}
        <OrderContextProvider>
          <IonSplitPane contentId="main">
            <Menu />

            <IonRouterOutlet id="main">
              <Route path="/home" component={Home} exact />

              <Route path="/page/:name" component={Page} exact />

              <Redirect from="/" to="/home" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </OrderContextProvider>
      </Switch>
    </IonReactRouter>
  </IonApp>
)

export default App
