import _ from 'lodash';
import { useEffect, useState } from 'react';

// 為了讓scroll不需要滑到底前就可以進行刷新，可以設置一個OFFSET，就是距離到底前多少像素
const OFFSET = 90;

export const useDownLoad = ({ hasMore = false, loadMore = () => { }, }) => {
  const [tips, setTips] = useState('');

  useEffect(() => {
    window.onscroll = _.debounce(async () => {
      /**
        documentElement的clientHeight:整個螢幕的可視高度
        documentElement的scrollTop:scroll的滑行高度，也就是scroll到頁面最頂端之間的高度
        body的scrollHeight:該頁面內容的實際整體高度
      */
      const { clientHeight, scrollTop } = document.documentElement;
      const { scrollHeight } = document.body;
      if (hasMore && (scrollTop + clientHeight >= scrollHeight - OFFSET)) {
        setTips('加載中...');
        await loadMore();
        setTips('加載完成');
        setTimeout(() => {
          setTips('');
        }, 1000);
      }
    }, 500);

    //這裡仍然不要忘了，就是有在useEffect做監聽事件，記得在onMount時將事件設置為空
    return () => {
      window.onscroll = null;
    };
  }, [hasMore]);

  return { tips };
};
