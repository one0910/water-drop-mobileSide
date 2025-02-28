import { IProduct } from '@/utils/types';
import style from './index.module.less';
import { Grid } from 'antd-mobile';
import { PhoneFill } from 'antd-mobile-icons';
import { ROUTE_KEY } from '@/routes/menus';
import { useGoTo } from '@/hooks';
interface IProps {
  data: IProduct
}

/**
*購買課程(商品)工具Bar
*/
const BuyBottom = ({ data }: IProps) => {
  const { go } = useGoTo();

  //按外立即訂購的按鈕時
  const goBuy = () => {
    go(ROUTE_KEY.BUY, { id: data.id })
  };

  return (
    <Grid columns={10} className={style.container}>
      <Grid.Item span={4}>
        <span className={style.preferentialPrice}>
          NT$
          {data.preferentialPrice}
        </span>
        <span className={style.originalPrice}>
          NT$
          {data.originalPrice}
        </span>
      </Grid.Item>
      <Grid.Item span={2}>
        <a href={`tel:${data.org.tel}`}>
          <PhoneFill className={style.tel} />
        </a>
      </Grid.Item>
      <Grid.Item
        span={4}
        className={style.buyButton}
        onClick={goBuy}
      >
        立即訂購
      </Grid.Item>
    </Grid>
  );
};

export default BuyBottom;
