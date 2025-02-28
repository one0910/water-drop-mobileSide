import style from './index.module.less';
import { ErrorBlock, Grid, PullToRefresh, InfiniteScroll } from 'antd-mobile';
import { useProducts } from '@/services/product';
import ProducCard from '../ProductCard';
import { ROUTE_KEY } from '@/routes/menus';
import { useGoTo } from '@/hooks';
// import InfiniteScroll from '@/components/InfiniteScroll';
// import PullToRefresh from '@/components/PullToRefresh';

interface IProps {
  name: string; // 搜索的關键字
  type: string; // 商品分類
}

/**
* 門店卡片列表
*/
const ProductList = ({ name, type }: IProps) => {
  const { data, onRefresh, hasMore, loadMore } = useProducts(name, type);
  const { go } = useGoTo()
  //若是該類別沒有資料，則顯示ErrorBlock的畫面
  if (data && data.length === 0) {
    return <ErrorBlock status="empty" />;
  }

  //進入課程(商品)詳情頁面
  const goProductInfo = (id: string) => {
    go(ROUTE_KEY.PRODUCT_INFO, { id });
  };

  return (
    <div className={style.container}>
      {/* <PullToRefresh onRefresh={() => onRefresh}> */}
      {/* 上面是手寫的PullToRefresh功能，下面是antDesign內建的PullToRefresh功能 */}
      {/* 下面onRefresh屬性，可以在當我們手指往下拉(也就是觸發ontouchmove)時會啟用資料刷新 */}
      <PullToRefresh onRefresh={onRefresh}>
        <Grid columns={2} gap={10}>
          {
            data?.map(item => (
              <Grid.Item key={item.id} onClick={() => goProductInfo(item.id)}>
                <ProducCard data={item} />
              </Grid.Item>
            ))
          }
        </Grid>
      </PullToRefresh>

      {/*課程中也有提供並教學如何撰寫InfiniteScroll組件，
      但這裡引用的仍是是antDesign內建的InfiniteScroll功能，因為功能也比較多
      另外 antDesign內建的InfiniteScroll它在第首次載入頁面時會先加載2頁的資料
      目的是讓首頁的資料多一點點，體驗上比較滑順*/}
      <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
};
export default ProductList;
