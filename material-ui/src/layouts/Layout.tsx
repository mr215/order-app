import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import OrderContextProvider from 'contexts/OrderContextProvider'
import Home from 'pages/Home'
import OrderItems from 'pages/OrderItems'
import PaymentSummary from 'pages/PaymentSummary'

import Header from './Header'

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',

    display: 'flex',
    flexDirection: 'column',
  },

  content: {
    flex: '1 1 0%',
    display: 'flex',
    flexDirection: 'column',

    overflowX: 'hidden',
    overflowY: 'auto',
  },
})

function Layout() {
  const classes = useStyles()

  return (
    <OrderContextProvider>
      <Container className={classes.root} disableGutters>
        <Header />

        <div className={classes.content}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/order-items" component={OrderItems} />
            <Route exact path="/payment-summary" component={PaymentSummary} />
          </Switch>
        </div>
      </Container>
    </OrderContextProvider>
  )
}

export default Layout
