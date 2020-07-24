import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined'
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface SideMenuProps {
  open: boolean
  anchor?: Anchor
  onToggle: (open: boolean) => void
}

const useStyles = makeStyles({
  menu: {
    width: 250,
  },
})

function SideMenu({ open, anchor = 'left', onToggle }: SideMenuProps) {
  const classes = useStyles()

  const handleToggle = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    onToggle(open)
  }

  return (
    <SwipeableDrawer
      open={open}
      anchor={anchor}
      onOpen={handleToggle(true)}
      onClose={handleToggle(false)}
    >
      <div
        role="presentation"
        className={classes.menu}
        onClick={handleToggle(false)}
        onKeyDown={handleToggle(false)}
      >
        <List disablePadding>
          <ListItem button>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary="Home" />
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemIcon>
              <PaymentOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary="Payments" />
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemIcon>
              <FormatListBulletedOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary="Tasks" />
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemIcon>
              <ShareOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary="Referrals" />
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemIcon>
              <PhoneOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary="+1 (415) 349-5085" />
          </ListItem>

          <Divider />
        </List>
      </div>
    </SwipeableDrawer>
  )
}

export default SideMenu
