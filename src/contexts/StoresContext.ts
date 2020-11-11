import { createContext } from 'react'

import AppStore from 'stores/appStore'
import FavoriteAddressesStore from 'stores/favoriteAddressesStore'
import OrderStore from 'stores/orderStore'
import UserStore from 'stores/userStore'

const StoresContext = createContext({
  appStore: new AppStore(),
  favoriteAddressesStore: new FavoriteAddressesStore(),
  orderStore: new OrderStore(),
  userStore: new UserStore(),
})

export default StoresContext
