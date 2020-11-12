import { makeAutoObservable } from 'mobx'

import { TOKEN_KEY } from 'utils/config'
import { getItem, removeItem, setItem } from 'utils/storage'
import { ProfileEntity, PaymentMethod, MarketEntity, SelectOption } from 'types'
import { fetchMarkets, fetchProfile, fetchPaymentMethods } from 'utils/api'

export default class AppStore {
  token: string | null = null
  markets: MarketEntity[] = []
  profile: ProfileEntity | null = null
  paymentMethods: PaymentMethod[] = []

  loaded: boolean = false
  loading: boolean = false
  error: string = ''

  constructor() {
    makeAutoObservable(this)

    this.loadPublicData()

    this.loadTokenFromStorage()
  }

  get marketOptions(): SelectOption[] {
    return this.markets.map(market => ({
      label: market.attributes.name,
      value: market.id,
    }))
  }

  get currentPaymentMethod(): PaymentMethod {
    return this.paymentMethods[0]
  }

  async setToken(token: string) {
    setItem(TOKEN_KEY, token)

    this.token = token

    // Load private data with token set
    await this.loadPrivateData()

    this.setLoaded(true)
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

  setLoaded(loaded: boolean) {
    this.loaded = loaded
  }

  setLoading(loading: boolean) {
    this.loading = loading
  }

  setError(error: string) {
    this.error = error
  }

  reset() {
    this.profile = null
    this.paymentMethods = []

    this.setLoaded(false)
  }

  loadTokenFromStorage() {
    const existingToken = getItem(TOKEN_KEY)

    if (existingToken) {
      this.setToken(existingToken)
    }
  }

  async loadPublicData() {
    try {
      this.setLoading(true)
      this.setError('')

      const response = await fetchMarkets()

      this.setMarkets(response.data.data)
    } catch (e) {
      this.setError(e.toString())
    } finally {
      this.setLoading(false)
    }
  }

  /**
   * Load app data after being authenticated.
   * It also gets called when loading the app with token stored in local storage
   */
  async loadPrivateData() {
    if (!this.token) {
      return
    }

    try {
      this.setLoading(true)
      this.setError('')

      const [profileResponse, paymentMethodsResponse] = await Promise.all([
        fetchProfile(),
        fetchPaymentMethods(),
      ])

      this.setProfile(profileResponse.data.data)
      this.setPaymentMethods(paymentMethodsResponse.data)
    } catch (e) {
      this.setError(e.toString())
    } finally {
      this.setLoading(false)
    }
  }
}
