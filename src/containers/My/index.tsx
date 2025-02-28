import { Grid, Image, List } from 'antd-mobile';
import { useUserContext } from '@/hooks/userHooks';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import { BankcardOutline, FaceRecognitionOutline, UnorderedListOutline } from 'antd-mobile-icons';
import style from './index.module.less';

/**
* 我的個人資訊頁
*/
const My = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  return (
    <div className={style.container}>
      <Grid columns={10} className={style.card}>
        <Grid.Item span={4}>
          <Image
            className={style.avatar}
            src={store.avatar}
            alt="個人圖片"
          />
        </Grid.Item>
        <Grid.Item span={6}>
          <div className={style.name}>
            {store.name}
          </div>
          <div
            className={style.edit}
            onClick={() => go(ROUTE_KEY.EDIT_INFO)}
          >
            編輯資料
          </div>
        </Grid.Item>
      </Grid>
      <List className={style.list}>
        <List.Item
          prefix={<FaceRecognitionOutline />}
          onClick={() => go(ROUTE_KEY.ORDER_COURSE)}
        >
          預約課程
        </List.Item>
        <List.Item
          prefix={<UnorderedListOutline />}
          onClick={() => go(ROUTE_KEY.MY_COURSE)}
        >
          我的課程表
        </List.Item>
        <List.Item
          prefix={<BankcardOutline />}
          onClick={() => go(ROUTE_KEY.MY_CARD)}
        >
          我的消费卡
        </List.Item>
      </List>
    </div>
  );
};

export default My;
