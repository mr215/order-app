import capitalize from 'lodash/capitalize'
import numeral from 'numeral'

export const titleCase = (str: string): string =>
  str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')

export const formatCurrency = (num: number): string =>
  numeral(num).format('$0,0.00')
