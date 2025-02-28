import { useDownLoad } from './hooks';
import style from './index.module.less';

interface IProps {
  hasMore: boolean; // 是否有需有更多的數據
  loadMore: () => Promise<unknown>;
}

/**
* 無限滚動组件
*/
const InfiniteScroll = ({ hasMore, loadMore }: IProps) => {
  const { tips } = useDownLoad({
    hasMore,
    loadMore,
  });
  return (
    <div className={style.container}>
      {hasMore ? tips : '沒有更多數據了'}
    </div>
  );
};

export default InfiniteScroll;
