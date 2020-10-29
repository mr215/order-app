import { makeAutoObservable, set } from 'mobx'

import { User, PaymentMethod, DEFAULT_USER } from 'types'

export default class ProfileStore {
  profile: User = DEFAULT_USER
  paymentMethods: PaymentMethod[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setProfile(profile: User) {
    set(this.profile, profile)
  }

  setPaymentMethods(paymentMethods: PaymentMethod[]) {
    this.paymentMethods = paymentMethods
  }

  reset() {
    this.setProfile(DEFAULT_USER)
    this.paymentMethods = []
  }
}
