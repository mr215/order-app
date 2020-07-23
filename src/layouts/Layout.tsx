import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Header from './Header'

function Layout() {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  )
}

export default Layout
