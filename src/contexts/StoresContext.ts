import { createContext } from 'react'

import OrderStore from 'stores/orderStore'

const StoresContext = createContext({
  orderStore: new OrderStore(),
})

export default StoresContext
