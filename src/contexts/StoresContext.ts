import { createContext } from 'react'

import OrderStore from 'stores/orderStore'
import UserStore from 'stores/userStore'
import SupplierStore from 'stores/supplierStore'

const StoresContext = createContext({
  orderStore: new OrderStore(),
  userStore: new UserStore(),
  supplierStore: new SupplierStore(),
})

export default StoresContext
