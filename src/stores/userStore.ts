import { observable, action, set } from 'mobx'

import { User, DEFAULT_USER } from 'types'

export default class UserStore {
  @observable
  user: User = DEFAULT_USER

  @action
  updateUser(newUser: Partial<User>) {
    set(this.user, newUser)
  }

  @action
  resetUser() {
    this.updateUser(DEFAULT_USER)
  }

  @action
  favoriteAddress(address: string) {
    this.user.favoriteAddresses.push(address)
  }

  @action
  unfavoriteAddress(address: string) {
    this.user.favoriteAddresses = this.user.favoriteAddresses.filter(
      fa => fa.toLowerCase() !== address.toLowerCase()
    )
  }
}
