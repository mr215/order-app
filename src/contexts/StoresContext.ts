import { createContext } from 'react'

import AuthStore from 'stores/authStore'
import FavoriteAddressesStore from 'stores/favoriteAddressesStore'
import OrderStore from 'stores/orderStore'
import AppStore from 'stores/appStore'
import UserStore from 'stores/userStore'

const StoresContext = createContext({
  authStore: new AuthStore(),
  appStore: new AppStore(),
  favoriteAddressesStore: new FavoriteAddressesStore(),
  orderStore: new OrderStore(),
  userStore: new UserStore(),
})

export default StoresContext
