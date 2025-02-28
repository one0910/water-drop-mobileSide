import { CheckShieldOutline, EnvironmentOutline, PhoneFill } from 'antd-mobile-icons';
import style from './index.module.less';
import { IOrganization } from '@/utils/types';
import { Grid, Image, Swiper } from 'antd-mobile';


/**
 *門店基本訊息組件
 */
interface IProps {
  data: IOrganization
}

const BaseInfo = ({ data }: IProps) => {
  return (
    <div className={style.container}>
      {/*Logo + 門市名稱*/}
      <div className={style.title}>
        <img src={data.logo} alt="logo" className={style.logo} />
        {data.name}
      </div>
      {/*標籤*/}
      <div className={style.tags}>
        {data.tags?.split(',').map((item: string) => (
          <span className={style.tagSpan} key={item}>
            <CheckShieldOutline />
            <span className={style.tagName}>
              {item}
            </span>
          </span>
        ))}
      </div>
      {/* 輪播 */}
      <div className={style.imgSwiper}>
        <Swiper
          loop
          autoplay
        >
          {[...(data.orgFrontImg || []), ...(data.orgRoomImg || [])].map((item) => (
            <Swiper.Item key={item.id}>
              <Image
                src={item.url}
                alt="門店圖片"
                fit="contain"
              />
            </Swiper.Item>
          ))}
        </Swiper>
      </div>
      {/* 地址 + 播打電話 */}
      <div className={style.address}>
        <Grid columns={24}>
          <Grid.Item span={20}>
            <EnvironmentOutline className={style.addressIcon} />
            <a href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`} target="_blank" rel="noopener noreferrer">
              <span className={style.addressText}>
                {data.address}
              </span>
            </a>
          </Grid.Item>
          <Grid.Item span={4}>
            <a href={`tel:${data.tel}`}>
              <PhoneFill className={style.phoneIcon} />
            </a>
          </Grid.Item>
        </Grid>
      </div>
    </div>);
};

export default BaseInfo;
