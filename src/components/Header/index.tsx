import style from './index.module.less';
import classNames from 'classnames';
import { useGoTo, useMatchRoute, useTitle } from '@/hooks';
import { LeftOutline } from 'antd-mobile-icons';

/**
*頂部banner組件
*/
const Header = ({ }) => {
  const route = useMatchRoute();
  const { back } = useGoTo();
  useTitle(route?.name);
  //回上一頁
  const onClickHandler = () => {
    back();
  };

  return (
    <div className={classNames({
      [style.containerLarge]: route?.isMenu,
      [style.containerSmall]: !route?.isMenu,
    })}
    >
      {/* 若是該頁面是目前底層選單的選項，則不顯示上一頁的ICON */}
      {!route?.isMenu && (
        <LeftOutline
          className={style.back}
          onClick={onClickHandler}
        />
      )}
      <div className={style.title}>
        {route?.name}
      </div>
    </div>
  );
};

export default Header;
