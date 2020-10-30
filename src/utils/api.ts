import axios, { AxiosRequestConfig } from 'axios'

import {
  User,
  MarketEntity,
  FavoriteAddressEntity,
  FavoriteAddressAttributes,
} from 'types'
import { TOKEN_KEY } from './config'
import { getItem } from './storage'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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

export const fetchMarkets = () =>
  axiosInstance.get<{ data: MarketEntity[] }>('/markets')

export const signUp = (payload: User) => axiosInstance.post('/signup', payload)

export const logIn = (user: Pick<User, 'email' | 'password'>) =>
  axiosInstance.post('/login', { auth: user })

export const fetchProfile = () => axiosInstance.get('/profile')

export const fetchPaymentMethods = () =>
  axiosInstance.get('/payment/payment_methods')

export const createPaymentSetupIntent = () =>
  axiosInstance.post('/payment/setup_intent')

export const fetchSuppliers = (params: any) =>
  axiosInstance.get('/suppliers', { params }).then(({ data }) => data)

export const fetchFavoriteAddresses = () =>
  axiosInstance
    .get<{ data: FavoriteAddressEntity[] }>('/favorite_addresses')
    .then(({ data }) => data)

export const addFavoriteAddress = (params: FavoriteAddressAttributes) =>
  axiosInstance
    .post<{ data: FavoriteAddressEntity }>('/favorite_addresses', params)
    .then(({ data }) => data)

export const deleteFavoriteAddress = (id: string) =>
  axiosInstance.delete(`/favorite_addresses/${id}`).then(({ data }) => data)
