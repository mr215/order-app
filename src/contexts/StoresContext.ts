import { createContext } from 'react'

import AuthStore from 'stores/authStore'
import FavoriteAddressesStore from 'stores/favoriteAddressesStore'
import MarketsStore from 'stores/marketsStore'
import OrderStore from 'stores/orderStore'
import ProfileStore from 'stores/profileStore'
import UserStore from 'stores/userStore'

const StoresContext = createContext({
  authStore: new AuthStore(),
  favoriteAddressesStore: new FavoriteAddressesStore(),
  marketsStore: new MarketsStore(),
  orderStore: new OrderStore(),
  profileStore: new ProfileStore(),
  userStore: new UserStore(),
})

export default StoresContext
