import { useCallback, useEffect, DependencyList } from 'react'

export const useDebouncedEffect = (
  effect: (...args: any) => any,
  delay: Number,
  deps: DependencyList
) => {
  const callback = useCallback(effect, deps)

  useEffect(() => {
    const handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [callback, delay])
}

export default useDebouncedEffect
