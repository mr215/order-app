export const parseJson = (value: string | null): any => {
  if (!value) {
    return null
  }

  try {
    JSON.parse(value)
  } catch (e) {
    return null
  }
}
