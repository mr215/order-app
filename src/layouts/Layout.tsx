import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Box from '@material-ui/core/Box'

import Home from '../pages/Home'
import Header from './Header'

function Layout() {
  return (
    <>
      <Header />

      <Box m={2}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Box>
    </>
  )
}

export default Layout
