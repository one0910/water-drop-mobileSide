import { IProduct } from '@/utils/types';
import style from './index.module.less';
import { Grid, Image } from 'antd-mobile';
import HorizontalLine from '@/components/HorizontalLine';
interface IProps {
  data: IProduct
}

/**
*基本訊息
*/
const BaseInfo = ({ data }: IProps) => {
  return (
    <div className={style.container}>
      <div className={style.headerContainer}>
        <Image
          src={data.bannerUrl}
          alt=""
          className={style.image}
        />
        <div className={style.title}>{data.name}</div>
        <div className={style.desc}>{data.desc}</div>
      </div>
      <HorizontalLine />
      <Grid columns={3} gap={8} className={style.sale}>
        <Grid.Item>
          剩餘庫存：
          {data.curStock}
        </Grid.Item>
        <Grid.Item>
          每人限購：
          {data.limitBuyNumber}
        </Grid.Item>
        <Grid.Item>
          已售：
          {data.buyNumber || 0}
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default BaseInfo;
