import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import SideMenu from './SideMenu'
import logoImg from '../images/logo.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      minHeight: 70,
    },

    imageContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      <AppBar position="static" color="transparent">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.imageContainer}>
            <img src={logoImg} alt="logo" width={50} />
          </div>
        </Toolbar>
      </AppBar>

      <SideMenu open={openSideMenu} onToggle={handleMenuToggle} />
    </>
  )
}

export default Header
