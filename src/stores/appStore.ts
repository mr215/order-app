import { makeAutoObservable } from 'mobx'

import { TOKEN_KEY } from 'utils/config'
import { getItem, removeItem, setItem } from 'utils/storage'
import { ProfileEntity, PaymentMethod, MarketEntity, SelectOption } from 'types'

export default class AppStore {
  token: string | null = null
  markets: MarketEntity[] = []
  profile: ProfileEntity | null = null
  paymentMethods: PaymentMethod[] = []

  constructor() {
    makeAutoObservable(this)

    const existingToken = getItem(TOKEN_KEY)

    if (existingToken) {
      this.token = existingToken
    }
  }

  get marketOptions(): SelectOption[] {
    return this.markets.map(market => ({
      label: market.attributes.name,
      value: market.id,
    }))
  }

  saveToken(token: string) {
    setItem(TOKEN_KEY, token)

    this.token = token
  }

  clearToken() {
    removeItem(TOKEN_KEY)

    this.token = null
  }

  setMarkets(markets: MarketEntity[]) {
    this.markets = markets
  }

  setProfile(profile: ProfileEntity) {
    this.profile = profile
  }

  setPaymentMethods(paymentMethods: PaymentMethod[]) {
    this.paymentMethods = paymentMethods
  }

  reset() {
    this.markets = []
    this.profile = null
    this.paymentMethods = []
  }
}
