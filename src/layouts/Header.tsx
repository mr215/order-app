import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import SideMenu from './SideMenu'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      // marginRight: theme.spacing(2),
    },

    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
  })
)

function Header() {
  const classes = useStyles()
  const [openSideMenu, setOpenSideMenu] = useState(false)

  const handleMenuOpen = () => {
    setOpenSideMenu(true)
  }

  const handleMenuToggle = (open: boolean) => {
    setOpenSideMenu(open)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            SupplyHound
          </Typography>
        </Toolbar>
      </AppBar>

      <SideMenu open={openSideMenu} onToggle={handleMenuToggle} />
    </>
  )
}

export default Header
