import { makeAutoObservable } from 'mobx'

import { ProfileEntity, PaymentMethod, MarketEntity, SelectOption } from 'types'

export default class AppStore {
  markets: MarketEntity[] = []
  profile: ProfileEntity | null = null
  paymentMethods: PaymentMethod[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get marketOptions(): SelectOption[] {
    return this.markets.map(market => ({
      label: market.attributes.name,
      value: market.id,
    }))
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
    this.profile = null
    this.paymentMethods = []
  }
}
