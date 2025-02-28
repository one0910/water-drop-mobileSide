import { useCallback, useState } from 'react'
import useMount from './useMount'

/**
 *1.實現組件初始化，發送請求獲取數據
 *2.手動觸發請求
 */

/**經驗上來說
 * interface通常用來定義物件的型別
 * type通常是用在已經有的別名或是要跟其他型別做連合時用的 例如 type A = string | boolean
 * 如果都不知道用什麼，那就用interface吧，這是一個技術約定*/
interface IOptions {
  params?: Record<string, string>
  manual?: boolean,
  onSuccess?: (res: unknown) => void,
  onFail?: (res: unknown) => void
}

const useRequest = (
  /**
  service: 一個函數，接受 params 作為參數，並返回一個 Promise<unknown>。
    (params: Record<string, string>)：這意味著 params 是一個物件，其鍵和值都必須是字串類型。
    Promise<unknown>：表示 service 是一個返回 Promise 的異步函數，但我們不確定它返回的數據類型（因此是 unknown）。
    另外相較於any，用unknown的好處是typescript 會提示我們它裡面是有哪些屬性，到時就可針對它回傳的屬性填入適當的型別，算是一個初初撰寫時的寫法
  params: 傳遞給 service 的參數，它也是一個鍵和值都為字串的物件。
  */
  service: (params: Record<string, string>) => Promise<unknown>,
  options: IOptions,
) => {
  //相較於any，用unknown的好處是typescript 會提示我們它裡面是有哪些屬性，到時就可針對它回傳的屬性填入適當的型別，算是一個初初撰寫時的寫法
  const [data, setData] = useState<unknown>()
  const [loading, setLoading] = useState<unknown>()

  const init = useCallback(
    async (curParams: Record<string, string>) => {
      setLoading(true)
      try {
        const res = await service(curParams)
        setData(res)
        setLoading(false)
        options.onSuccess && options.onSuccess(res)
        return res
      } catch (error) {
        setLoading(false)
        options.onFail && options.onFail(error)
        throw error
      } finally {
        setLoading(false)
      }

    }, [service])

  useMount(() => {
    if (!options.manual) {
      init(options.params || {});
    }
  })

  const run = (runParam: Record<string, string>) => {
    return init(runParam)
  }
  return { loading, data, run }
}

export default useRequest