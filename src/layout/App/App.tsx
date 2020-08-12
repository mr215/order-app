import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'

import Menu from 'components/Menu/Menu'
import Page from 'pages/Page/Page'

/* Theme */
import 'theme/app.scss'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />

        <IonRouterOutlet id="main">
          <Route path="/page/:name" component={Page} exact />
          <Redirect from="/" to="/page/Inbox" exact />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
)

export default App
