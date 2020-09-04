import capitalize from 'lodash/capitalize'

export const titleCase = (str: string) => {
  const words = str.split(' ')

  return words.map(word => capitalize(word)).join(' ')
}
