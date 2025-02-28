import { useEffect } from 'react'

/**
 *組件加載時運行
 *@param fn
 */

const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, [])
}

export default useMount

