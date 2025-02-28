import { act, fireEvent, render, renderHook, waitFor, } from '@testing-library/react'
import useRequest from "@/hooks/useRequest";
import { getDayTw } from "@/utils";
import { MemoryRouter } from 'react-router-dom';
import Bottom from '@/components/Bottom';

/**
 *單元測試簡單三步驟
  1.構造環境，例如 it('xx測試',()={})
  2.調用被測試對象, 例如 const res = getDayTw('Monday')
  3.進行預期斷言言，例如 expect(res).toBe('星期一')
*/

describe('測試', () => {
  //這裡做一個簡單的utlis的測試，我們去檢測getDayTw這個函式的輸入輸出
  it('utils 測試', () => {
    //構造環境
    //調用被測試對象
    // 進行預期斷言言
    const res = getDayTw('Monday');
    expect(res).toBe('星期一');
  });

  //這裡則是做一個hook的測試，我們去檢測useRequest這個hook的輸入輸出
  it('hooks 測試', async () => {
    /*1. useRequest這個hook要帶入Promise函數及它定義的IOptions類型的物件，
    所以我們來寫一個new Promise的測試請求*/
    const service = () => new Promise((resolve) => {
      return resolve(true);
    });

    //2.然後透過renderHook這個react test的方法來模擬執行hoook，然後我們帶入service及空物件{}來做測1
    const { result } = renderHook(() => useRequest(service, {}));

    /*3.由於我們測試的useRequest hook，它裡面會執行非同步程序，
    所以這裡一樣需要做一個模擬的非同步等待，這樣result才能正確的收到useRequest回傳的資料*/
    await waitFor(() => { });

    //4.最後進行expect的預期斷言
    expect(result.current.data).toBe(true);
  });

  //這裡做一個組件測試
  it('组件測試', async () => {
    const { getByText } = render(
      /*由於要測試的Bottom組件裡有包含useLocation() 和 useNavigate()，
      所以需要使用MemoryRouter來讓測試環模擬Router路由*/
      <MemoryRouter>
        <Bottom />
      </MemoryRouter>,
    );

    const myDom = getByText('我的');

    /*這邊用一個act函數來包裹我們模擬的點擊行為，用act包裹的用意是整個測試程序它可以等待我們點擊後state的變化完畢後
    (state的變化算是一個異步過程，這樣的異步過程通常需要等待)，才會繳續往下執行，另外act()與hook測試裡的waitFor()是一樣的
    只是waitFor()通常是用來在測試hook時使用它會等待Promise結束，而act()通常是在組件測試時使用它會等待state更新完畢，*/
    act(() => {
      fireEvent.click(myDom);
    });
    const className = myDom.parentElement?.className
    // 最後進行expect的斷言判斷，這裡測試該件的父層否包含"adm-tab-bar-item-active"的class
    expect(className).toContain('adm-tab-bar-item-active');
  });

})