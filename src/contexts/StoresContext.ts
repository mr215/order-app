import { createContext } from 'react'

import OrderStore from 'stores/orderStore'
import UserStore from 'stores/userStore'

const StoresContext = createContext({
  orderStore: new OrderStore(),
  userStore: new UserStore(),
})

export default StoresContext
