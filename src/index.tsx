import React from 'react'
import ReactDOM from 'react-dom'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { LoadScript } from '@react-google-maps/api'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import App from './layout/App'
import * as serviceWorker from './serviceWorker'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)

ReactDOM.render(
  <LoadScript
    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
    libraries={['places']}
  >
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </LoadScript>,
  document.getElementById('root')
)

defineCustomElements(window)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
