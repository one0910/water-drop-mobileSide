import style from './index.module.less';
import { TabBar } from 'antd-mobile';
import { routes } from '@/routes/menus';
import { useGoTo, useMatchRoute } from '@/hooks';
import SvgWrapper from '../SvgWrapper';

/**
* 底部選單組件
*/
const Bottom = ({ }) => {
  const route = useMatchRoute();
  const { go } = useGoTo();

  const onTabChangeHandler = (key: string) => {
    go(key);
  }

  /**
  route裡有個參數isMenu,被用來設計是可否需要顯示在選單上，如果我的route裡沒有isMenu，
  則代表該頁不需要顯示底部的menu
  */
  if (!route?.isMenu) {
    return null;
  }

  /**
  TabBar.Item裡的icon屬性有提供一個回傳的方法可以判斷該icon目前是否是正在被點擊
  如下所示，is為true時則代表目前被點擊，false則代表未被點擊*/
  const iconRender = (is: boolean, icon?: string) => (
    <SvgWrapper
      src={icon}
      color={is ? '#01979a' : '#999999'}
    />
  );

  return (
    <div className={style.container}>
      <TabBar onChange={onTabChangeHandler} activeKey={route?.key} >
        {
          /**
            1.先過濾isMenu為true的路由
            2.再將isMenu為true的路由的路徑給透過map渲染出來*/
          routes.filter((route) => route.isMenu).map(
            (item) => (
              <TabBar.Item
                key={item.key}
                icon={(is) => iconRender(is, item.icon)}
                title={item.name}
              />
            ),
          )
        }
      </TabBar>
    </div>
  );
};

export default Bottom;
