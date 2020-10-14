import { makeAutoObservable } from 'mobx'

import { TOKEN_KEY } from 'utils/config'
import { getItem, removeItem, setItem } from 'utils/storage'

export default class AuthStore {
  token: string | null = null

  constructor() {
    makeAutoObservable(this)

    const existingToken = getItem(TOKEN_KEY)

    if (existingToken) {
      this.token = existingToken
    }
  }

  saveToken(token: string) {
    setItem(TOKEN_KEY, token)

    this.token = token
  }

  clearToken() {
    removeItem(TOKEN_KEY)

    this.token = null
  }
}
