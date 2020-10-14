import { makeAutoObservable, set } from 'mobx'

import { User, DEFAULT_USER } from 'types'

export default class UserStore {
  user: User = DEFAULT_USER

  constructor() {
    makeAutoObservable(this)
  }

  updateUser(user: Partial<User>) {
    set(this.user, user)
  }

  resetUser() {
    this.updateUser(DEFAULT_USER)
  }

  favoriteAddress(address: string) {
    this.user.favoriteAddresses.push(address)
  }

  unfavoriteAddress(address: string) {
    this.user.favoriteAddresses = this.user.favoriteAddresses.filter(
      fa => fa.toLowerCase() !== address.toLowerCase()
    )
  }
}
