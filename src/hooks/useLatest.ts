import { useRef } from 'react'

/**
 *獲取最新的value
 *@param value
 *1.useLatest 是一個 React 的自定義 Hook，用來保存最新的值（value），並透過 useRef 持續保持對此值的引用。
 *2.此 Hook 通常用於防止 React 中的閉包陷阱（closure trap），確保在回呼函式或副作用中可以獲取最新的值。
 *3.透過 useRef，值不會因為 React 的重新渲染而丟失。
 *4.每次呼叫 useLatest，ref.current 都會被更新為最新的 value。
 */

/**
* 型別從外層進來：泛型 <T> 是由使用者在函式呼叫時指定的，或由 TypeScript 自動推斷的。如下範例所示
const latestArray = useLatest<number[]>([1, 2, 3]);
const latestObject = useLatest<{ id: number; name: string }>({ id: 1, name: "Alice" });
*/
const useLatest = <T>(value: T) => {
  const ref = useRef(value)
  //為防止fnRef.current是空的，在這裡可以再加一段，強制賦予value給fnRef.current，也可以保證所緩存的fnRef.current是最新的
  ref.current = value
  return ref
}

export default useLatest