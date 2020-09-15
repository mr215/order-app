import React from 'react'
import { useLocation } from 'react-router-dom'

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react'
import {
  callOutline,
  cardOutline,
  homeOutline,
  listOutline,
  logOutOutline,
  // shareSocialOutline,
} from 'ionicons/icons'

import useStores from 'hooks/useStores'
import { DEFAULT_USER } from 'types'

interface MenuItem {
  title: string
  icon: string
  routerLink?: string
  href?: string
}

const menuItems: MenuItem[] = [
  {
    title: 'Home',
    icon: homeOutline,
    routerLink: '/home',
  },
  {
    title: 'Payment',
    icon: cardOutline,
    routerLink: '/page/Payment',
  },
  {
    title: 'History',
    icon: listOutline,
    routerLink: '/page/History',
  },
  // TODO: Add this back when we support this feature
  // {
  //   title: 'Referrals',
  //   icon: shareSocialOutline,
  //   routerLink: '/page/Referrals',
  // },
  {
    title: '+1 (415) 349-5085',
    icon: callOutline,
    href: 'tel:4153495085',
  },
  {
    title: 'Logout',
    icon: logOutOutline,
    href: '/landing',
  },
]

const Menu: React.FC = () => {
  const location = useLocation()

  const { userStore } = useStores()

  const handleClick = () => {
    userStore.updateUser(DEFAULT_USER)
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList mode="ios">
          <IonListHeader>Menu</IonListHeader>

          {menuItems.map((menuItem, index) => {
            const routerProps = menuItem.href
              ? { href: menuItem.href }
              : { routerLink: menuItem.routerLink }

            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  mode="ios"
                  className={
                    location.pathname === menuItem.routerLink ? 'selected' : ''
                  }
                  {...routerProps}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  onClick={menuItem.title === 'Logout' ? handleClick : () => {}}
                >
                  <IonIcon slot="start" icon={menuItem.icon} />
                  <IonLabel>{menuItem.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Menu
