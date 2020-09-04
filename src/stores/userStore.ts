import { observable, action, set } from 'mobx'

import { User } from 'types'

const DEFAULT_USER = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  accountingEmail: '',
  password: '',
}

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
}
