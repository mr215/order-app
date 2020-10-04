import { parseJson } from './misc'

const getKey = (key: string): string =>
  `${process.env.REACT_APP_STORAGE_PREFIX}_${key}`

export const setItem = (key: string, value: any): void =>
  localStorage.setItem(getKey(key), JSON.stringify(value))

export const getItem = (key: string): any =>
  parseJson(localStorage.getItem(getKey(key)))
