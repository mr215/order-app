import { makeAutoObservable } from 'mobx'

import { MarketEntity } from 'types'

export default class MarketsStore {
  markets: MarketEntity[] = []

  constructor() {
    makeAutoObservable(this)
  }
}
