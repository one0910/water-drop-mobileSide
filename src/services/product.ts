import { GET_PRODUCT, GET_PRODUCT_TYPES, GET_PRODUCTS, GET_PRODUCTS_BY_ORG_ID } from '@/graphql/product';
import { DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from '@/utils/constants';
import { IProduct, TProductQuery, TProductsQuery, TProductTypeQuery } from '@/utils/types';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';

//獲取商品類型API的hook
export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};

//取得目前client端的經緯度位置
export const getPosition = () => new Promise<{ latitude: number; longitude: number }>((resolve) => {
  //navigator.geolocation.getCurrentPosition()的方法可以透過瀏覽取得當前client的目前座標，裡面會回傳3個參數，一個是成功，另一個則是失敗
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.");
    resolve({ latitude: 0, longitude: 0 }); // 瀏覽器不支援地理位置
  }
  navigator.geolocation.getCurrentPosition(
    //若成功取得座標，則會回傳一個帶有座標資料的參數
    (positionData) => {
      const { latitude, longitude } = positionData.coords;
      resolve({ latitude, longitude });
    },
    //沒有成功取得資料，也可以自行設計回傳的方法，以下為例，若沒成功取得座標，則透過Promise回傳經、緯度為0的資料
    (error) => {
      console.error("Error obtaining geolocation:", error);
      resolve({ latitude: 0, longitude: 0 });
    },
    {
      enableHighAccuracy: true, // 提高定位精度
      timeout: 3000,
      maximumAge: 0,
    }
  );
});

//取得所有課程(產品)資料
export const useProducts = (name = '', type = '') => {
  const currentPate = useRef(1); //使用useRef來記住目前刷到的頁面，用useRef的好處是不會受render的影響而改變其值，通常被用來當全域的變數用
  const [hasMore, setHasMore] = useState(true); //透過hasMore可以用來決定前端畫面在滾動刷新時顯示什麼樣的提示

  /**由於要做無限滾動刷新資料的功能，所以總不能每次滾動刷新就重新將資料重新重置一次
  因此改變的做法是把刷新後的資料另外再存起來，所以我們可以把本來透過useLazyQuery的data，
  另外再拉出來放useState，如下所示，然後原本的init()及onRefreshHandler的寫法就要調整*/
  const [data, setData] = useState<IProduct[]>([]);
  const [get] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);
  /**下面這是一個常見的分離關注點的寫法，就是將資料獲取的邏輯封裝在一個單獨函式 (init) 中
  這樣的寫法init 既可以被 useEffect 調用，也可以通過 onRefresh 在其他情況下重複使用*/

  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: 'loading',
      content: '載入中…',
    });

    const { latitude, longitude } = await getPosition();
    const res = await get({
      /**
      fetchPolicy用於控制如何從快取或網路獲取 GraphQL 查詢的資料，
      network-only始終從網路獲取資料，不使用快取
      如果我希望資料始終都是保持最新。永遠都是直接從後端獲取，就使用network-only
      */
      fetchPolicy: 'network-only',
      variables: {
        name,
        type: type === DEFAULT_TYPE ? '' : type, //傳到後端的type如果為空字串，則回傳所有type資料
        latitude,
        longitude,
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
      onCompleted() {
        toast.close();
      },
    });
    return res.data?.getProductsForH5.data || [];
  }

  const onRefreshHandler = async () => {
    // 重新初始化设置
    currentPate.current = 1;
    const res = await init();
    // 这里要提前对于更多值(hasMore)加一个判断，
    // 防止切换 type 的时候，hasMore 没有变成默认值
    if (res.length < DEFAULT_PAGE_SIZE) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setData(res);
  }

  //將資料獲取的邏輯封裝好後(init())，放入到useEffect並搭配依賴來使用
  useEffect(() => {
    onRefreshHandler();
  }, [name, type])

  const loadMoreHandler = async () => {
    //我們可以把將資料獲取的邏輯封裝好後(init())，放入到無限刷新的功能裡
    //當sroll往下快到底部時，則進行資料刷新
    const res = await init(currentPate.current + 1);
    //刷新後若有回傳有資料
    if (res.length > 0) {
      currentPate.current += 1;
      setHasMore(true);
      setData((old) => [...old, ...res]);
      //刷新後若有回傳無資料，
    } else {
      setHasMore(false);
    }
  };
  return {
    onRefresh: onRefreshHandler,
    loadMore: loadMoreHandler,
    hasMore,
    data: data,
  }
}

//取得同門市的課程(產品)
export const useProductsByOrgId = (orgId: string) => {
  const { data } = useQuery<TProductsQuery>(
    GET_PRODUCTS_BY_ORG_ID,
    {
      variables: {
        orgId,
      },
    },
  );

  return data?.getProductsByOrgIdForH5.data;
};

//取得某一課程(商品)詳細資料
export const useProductInfo = (id?: string) => {
  const { data, loading } = useQuery<TProductQuery>(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  return { data: data?.getProductInfo.data, loading };
};
