import React from 'react'
import ReactDOM from 'react-dom'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { LoadScript } from '@react-google-maps/api'
import 'mobx-react-lite/batchingForReactDom'

import App from './layout/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <LoadScript
    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
    libraries={['places']}
  >
    <App />
  </LoadScript>,
  document.getElementById('root')
)

defineCustomElements(window)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
