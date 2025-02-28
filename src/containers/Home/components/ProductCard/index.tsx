import style from './index.module.less';
import { Image } from 'antd-mobile';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import { IProduct } from '@/utils/types';

interface IProps {
  data: IProduct
}

/**
* 門店卡片列表
*/
const ProducCard = ({ data }: IProps) => {
  const { go } = useGoTo();

  //當點擊門店門
  const goOrgInfo = (id: string, event: React.MouseEvent) => {
    //防止冒泡事件發生，若不加上event.stopPropagation()當點擊goOrgInfo()，也會同時讓父層的goProductInfo()也被執行
    event.stopPropagation();
    go(ROUTE_KEY.ORG_INFO, { id });
  };
  return (
    <div className={style.container}>
      <Image
        src={data.coverUrl}
        className={style.img}
      />
      <div className={style.info}>
        <div className={style.name}>
          {data.name}
        </div>
        <div
          className={style.org}
          onClick={(event) => goOrgInfo(data.org.id, event)}
        >
          <span className={style.orgName}>
            {data.org.name}
          </span>
          <span className={style.distance}>
            {data.distance || '未知'}
          </span>
        </div>
        <div className={style.price}>
          <span className={style.preferentialPrice}>
            NT$ {data.preferentialPrice}
          </span>
          <span className={style.originalPrice}>
            NT$ {data.originalPrice}
          </span>
        </div>
      </div>
    </div>

  );
};

export default ProducCard;
