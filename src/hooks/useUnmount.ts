import { useEffect } from 'react'
import useLatest from './useLatest'

/**
 *組件卸載時運行
 *@param fn
 */

const useUnmount = (fn: () => void) => {
  /**
  由於組件卸載時，去執行的方法都是固定的，不應該被刷新，
  所以可以利用useRef來緩存這個方法，如下所示
  */
  const fnRef = useLatest(fn)

  useEffect(() => {
    return fnRef.current();
  }, [])
}

export default useUnmount