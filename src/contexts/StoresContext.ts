import { createContext } from 'react'

import AuthStore from 'stores/authStore'
import UserStore from 'stores/userStore'
import OrderStore from 'stores/orderStore'
import MarketsStore from 'stores/marketsStore'

const StoresContext = createContext({
  authStore: new AuthStore(),
  userStore: new UserStore(),
  orderStore: new OrderStore(),
  marketsStore: new MarketsStore(),
})

export default StoresContext
