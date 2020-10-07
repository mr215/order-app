export const parseJson = (value: string | null): any => {
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}
