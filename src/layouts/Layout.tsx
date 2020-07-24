import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Home from '../pages/Home'
import Header from './Header'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

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
    <Container className={classes.root} disableGutters>
      <Header />

      <div className={classes.content}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Container>
  )
}

export default Layout
