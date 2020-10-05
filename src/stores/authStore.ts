import { makeAutoObservable } from 'mobx'

import { getItem, removeItem, setItem } from 'utils/storage'

const TOKEN_NAME = 'token'

export default class AuthStore {
  token: string | null = null

  constructor() {
    makeAutoObservable(this)

    const existingToken = getItem(TOKEN_NAME)

    if (existingToken) {
      this.token = existingToken
    }
  }

  saveToken(token: string) {
    setItem(TOKEN_NAME, token)

    this.token = token
  }

  clearToken() {
    removeItem(TOKEN_NAME)

    this.token = null
  }
}
