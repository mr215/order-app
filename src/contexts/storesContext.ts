import { createContext } from 'react'

import OrderStore from 'stores/orderStore'

const storesContext = createContext({
  orderStore: new OrderStore(),
})

export default storesContext
