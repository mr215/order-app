import { createContext } from 'react'

import UserStore from 'stores/userStore'
import OrderStore from 'stores/orderStore'
import SuppliersStore from 'stores/suppliersStore'

const StoresContext = createContext({
  userStore: new UserStore(),
  orderStore: new OrderStore(),
  suppliersStore: new SuppliersStore(),
})

export default StoresContext
