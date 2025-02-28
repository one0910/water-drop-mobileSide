import { useProductsByOrgId } from '@/services/product';
import {
  Card, Grid, Image, Result,
} from 'antd-mobile';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import style from './index.module.less';

interface IProps {
  orgId: string;
}

/**
* 門市推薦课程，只顯示最多 5 條
*/
const RecommendProducts = ({ orgId }: IProps) => {
  const data = useProductsByOrgId(orgId);
  const { go } = useGoTo();

  //前往該課程詳細資料頁
  const goToProduct = (productId: string) => {
    go(ROUTE_KEY.PRODUCT_INFO, { id: productId });
  };

  if (!data) {
    return (
      <Result
        status="warning"
        title="提示"
        description="没有推薦的课程"
      />
    );
  }

  return (
    <Card title="推薦课程" className={style.container}>
      {
        data.map((item) => (
          <div key={item.id} onClick={() => goToProduct(item.id)}>
            <Grid
              columns={12}
              className={style.item}
            >
              {/* 課程圖片 */}
              <Grid.Item span={2}>
                <Image
                  src={item.coverUrl}
                  alt="課程圖片"
                  className={style.img}
                />
              </Grid.Item>

              {/* 課程內容 */}
              <Grid.Item span={8} className={style.content}>
                <div className={style.title}>
                  {item.name}
                </div>
                <div className={style.desc}>
                  <span className={style.descContent}>
                    {item.desc}
                  </span>
                  <span className={style.count}>
                    已售&nbsp;{item.buyNumber || 0}
                  </span>
                </div>
              </Grid.Item>

              {/* 課程價格 */}
              <Grid.Item span={2}>
                <div className={style.price}>
                  NT$&nbsp;{item.preferentialPrice}
                </div>
                <div className={style.oldPrice}>
                  NT$&nbsp;{item.originalPrice}
                </div>
              </Grid.Item>
            </Grid>
          </div>
        ))
      }
    </Card>
  );
};

export default RecommendProducts;
