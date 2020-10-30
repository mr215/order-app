import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
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
  // listOutline,
  logOutOutline,
  // shareSocialOutline,
} from 'ionicons/icons'
import { observer } from 'mobx-react-lite'

import { HOME_ROUTE, LANDING_ROUTE } from 'utils/config'
import useStores from 'hooks/useStores'

interface MenuItem {
  title: string
  icon: string
  routeProps: {
    routerLink?: string
    href?: string
    onClick?(): void
  }
}

const Menu: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { authStore, appStore, userStore } = useStores()

  const menuItems: MenuItem[] = [
    {
      title: 'Home',
      icon: homeOutline,
      routeProps: {
        routerLink: HOME_ROUTE,
      },
    },
    {
      title: 'Payment',
      icon: cardOutline,
      routeProps: {
        routerLink: '/payment-setup',
      },
    },

    // TODO: Add this back when we support this feature
    // {
    //   title: 'History',
    //   icon: listOutline,
    //   routeProps: {
    //     routerLink: '/page/History',
    //   },
    // },

    // TODO: Add this back when we support this feature
    // {
    //   title: 'Referrals',
    //   icon: shareSocialOutline,
    //   routeProps: {
    //     routerLink: '/page/Referrals',
    //   },
    // },
    {
      title: '+1 (415) 349-5085',
      icon: callOutline,
      routeProps: {
        href: 'tel:4153495085',
      },
    },
    {
      title: 'Logout',
      icon: logOutOutline,
      routeProps: {
        onClick() {
          authStore.clearToken()
          appStore.reset()
          userStore.reset()

          history.push(LANDING_ROUTE)
        },
      },
    },
  ]

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList mode="ios">
          <IonListHeader>Menu</IonListHeader>

          {menuItems.map((menuItem, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  mode="ios"
                  lines="full"
                  color={
                    location.pathname === menuItem.routeProps.routerLink
                      ? 'secondary'
                      : ''
                  }
                  detail={false}
                  {...menuItem.routeProps}
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

export default observer(Menu)
