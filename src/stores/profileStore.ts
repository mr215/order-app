import { makeAutoObservable } from 'mobx'

import { ProfileEntity, PaymentMethod } from 'types'

export default class ProfileStore {
  profile: ProfileEntity | null = null
  paymentMethods: PaymentMethod[] = []

  constructor() {
    makeAutoObservable(this)
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
