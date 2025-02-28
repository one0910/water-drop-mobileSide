import { TCourse } from '@/utils/types';
import { Card, Grid } from 'antd-mobile';
import HorizontalLine from '@/components/HorizontalLine';
import style from './index.module.less';

interface IProps {
  data: TCourse[]
}

/**
*課程(商品)信息
*/
const CourseInfo = ({ data }: IProps) => {
  return (
    <div className={style.container}>
      <Grid columns={1} gap={10}>
        {data?.map((item) => (
          <Grid.Item key={item.id}>
            <Card title={item.cardName} key={item.id} className={style.courseCard}>
              <div className={style.contentItem}>
                {item.desc}
              </div>
              <HorizontalLine />
              <div className={style.contentItem}>
                <div className={style.label}>預約訊息</div>
                {item.reserveInfo}
              </div>
              <HorizontalLine />
              <div className={style.contentItem}>
                <div className={style.label}>退款訊息</div>
                {item.refundInfo}
              </div>
              <HorizontalLine />
              <div className={style.contentItem}>
                <div className={style.label}>其他訊息</div>
                {item.otherInfo}
              </div>
            </Card>
          </Grid.Item>
        ))}

      </Grid>
    </div>
  );
};

export default CourseInfo;
