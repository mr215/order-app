import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'

import OrderContextProvider from 'contexts/OrderContextProvider'
import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'
import Home from 'pages/Home'
import OrderItems from 'pages/OrderItems'
import Page from 'pages/Page'

import Menu from './Menu'

/* Theme */
import 'theme/app.scss'
import UserContextProvider from 'contexts/UserContextProvider'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Switch>
        {/* App page routes */}
        <UserContextProvider>
          <OrderContextProvider>
            <IonSplitPane contentId="main">
              <Menu />

              <IonRouterOutlet id="main">
                <Route exact path="/home" component={Home} />
                <Route exact path="/order-items" component={OrderItems} />

                <Route exact path="/page/:name" component={Page} />


                <Route exact path='/new' component={SignUp} />
                <Route exact path="/login" component={LogIn} />



                <Redirect exact from="/" to="/home" />
              </IonRouterOutlet>
            </IonSplitPane>
          </OrderContextProvider>
        </UserContextProvider>

      </Switch>
    </IonReactRouter>
  </IonApp>
)

export default App
