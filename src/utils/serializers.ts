import { AxiosError } from 'axios'
import capitalize from 'lodash/capitalize'

export const serializeError = (
  e: AxiosError<Record<string, string[]>>
): string => {
  const { data } = e.response!

  if (!data) {
    return 'Error in api request'
  }

  return Object.keys(data)
    .map((field: string) => `${capitalize(field)} ${data[field][0]}`)
    .join('<br />')
}
