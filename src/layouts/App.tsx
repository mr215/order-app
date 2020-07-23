import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './Layout'

function App() {
  return (
    <Router>
      <Switch>
        {/* TODO: Login routes */}

        <Route component={Layout} />
      </Switch>
    </Router>
  )
}

export default App
