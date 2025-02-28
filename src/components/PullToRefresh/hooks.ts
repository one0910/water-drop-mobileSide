import { useEffect, useRef, useState } from 'react';
const MAX_Y = 100;

export const STATUS = {
  START: 'start', //開始下拉刷新
  AWAIT: 'await', // 手指或滑鼠放開後立即刷新
  LOADING: 'loading', // 正在刷新
  SUCCESS: 'success', // 刷新成功
  FINISH: 'finish', // 完成
};

export const TIPS = {
  [STATUS.START]: '開始下拉刷新',
  [STATUS.AWAIT]: '釋放立即刷新',
  [STATUS.LOADING]: '正在刷新',
  [STATUS.SUCCESS]: '刷新成功',
};



export const usePullToRefresh = (onRefresh: () => void) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(STATUS.FINISH);
  const y = useRef(0);

  //1.這裡設置ontouchstart和ontouchmove，就是手指在接觸後及滑動的過程
  useEffect(() => {
    if (!containerRef.current) return () => { };
    containerRef.current.ontouchstart = (event) => {
      event.preventDefault()
      /**scrollbar要在頂部的位置(scrollTop =0)時，才需要進行刷新，
      這也就是為何下面的ontouchstart及ontouchmove的事件觸發都要在這個條件下進去*/

      if (document.documentElement.scrollTop === 0) {
        y.current = event.touches[0].pageY;
      }
    }
    containerRef.current.ontouchmove = (event) => {
      /**
      課程中加上event.preventDefault()這一段，可以防止手機模式瀏覽時，當手指往下拉會造成header有白條
      不過我目前測試就算不加也沒影響
      */
      event.preventDefault()
      if (document.documentElement.scrollTop === 0) {
        /**
        先設置開始往下滑超過我們所設置的最大像素100，則進行刷新，這邊有個巧思是先設置刷新再設置START
        主要是因為若先設置START，那START就會先被觸發，再去觸發AWAIT，造成setStatus一直在變化，所以
        我在這裡若是先設置AWAIT，就不會讓START一直被觸發，因為設置完setStatus(STATUS.AWAIT)即返迴return，
        這樣它不會再去往下去執行START設置*/

        if (event.touches[0].pageY - y.current > MAX_Y) {
          setStatus(STATUS.AWAIT);
          return;
        }

        //再來設置當開始向下滑，就開始設置狀態來記憶
        if (event.touches[0].pageY - y.current > 0) {
          setStatus(STATUS.START);
        }
      }
    }
    //這置務必得在unmount後將ontouchstart及ontouchmove設置為空，不然會影響到其他頁面
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchstart = null;
        containerRef.current.ontouchmove = null;
      }
    }

  }, [])

  //2.這裡設置ontouchend，就是手指在滑完螢幕並離開螢幕後要進行資料刷新
  useEffect(() => {
    if (!containerRef.current) return () => { };
    containerRef.current.ontouchend = async () => {
      if (status === STATUS.AWAIT) {
        setStatus(STATUS.LOADING);
        await onRefresh();
        setStatus(STATUS.SUCCESS);

        //體感上的做法，刷新成功後，過500ms再給它finish，有交互作用的感覺
        setTimeout(() => {
          setStatus(STATUS.FINISH);
        }, 500);
        return
      }
      //若手指在離開時，scroll沒有到top頂端，則不需要刷新
      setStatus(STATUS.FINISH);
    }
    //刷新完，組件unmount後，將ontouchend設置為空
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchend = null;
      }
    };
    //這裡放了一個status做為依賴，就是只有當status變更時才進行刷新
  }, [status])

  //3.最後將其最終的狀態及DOM return出去
  return {
    status,
    containerRef,
  };
}