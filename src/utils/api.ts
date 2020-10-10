import axios, { AxiosRequestConfig } from 'axios'

import { User, MarketEntity } from 'types'
import { TOKEN_KEY } from './config'
import { getItem } from './storage'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getItem(TOKEN_KEY)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const checkEmail = (email: string) =>
  axiosInstance.post('/check', { email })

export const signUp = (payload: User) => axiosInstance.post('/signup', payload)

export const logIn = (user: Pick<User, 'email' | 'password'>) =>
  axiosInstance.post('/login', { auth: user })

export const fetchMarkets = () =>
  axiosInstance.get<{ data: MarketEntity[] }>('/markets')
