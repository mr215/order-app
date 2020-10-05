import { createContext } from 'react'

import AuthStore from 'stores/authStore'
import UserStore from 'stores/userStore'
import OrderStore from 'stores/orderStore'
import SuppliersStore from 'stores/suppliersStore'

const StoresContext = createContext({
  authStore: new AuthStore(),
  userStore: new UserStore(),
  orderStore: new OrderStore(),
  suppliersStore: new SuppliersStore(),
})

export default StoresContext
