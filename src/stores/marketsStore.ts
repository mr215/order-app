import { makeAutoObservable } from 'mobx'

import { MarketEntity, SelectOption } from 'types'

export default class MarketsStore {
  markets: MarketEntity[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get options(): SelectOption[] {
    return this.markets.map(market => ({
      label: market.attributes.name,
      value: market.id,
    }))
  }
}
