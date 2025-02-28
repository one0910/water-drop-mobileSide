import { useProductTypes } from '@/services/product';
import { SpinLoading, Tabs } from 'antd-mobile';
import { DEFAULT_TYPE } from '@/utils/constants';
import style from './index.module.less';

interface IProps {
  onChange: (key: string) => void;
}

/**
* 分類選擇器
*/
const TypeSelect = ({
  onChange,
}: IProps) => {
  const { data, loading } = useProductTypes();
  if (loading && data.length === 0) {
    return <SpinLoading />;
  }

  return (
    <Tabs
      className={style.tabs}
      onChange={onChange}
      defaultActiveKey={DEFAULT_TYPE}
    >
      <Tabs.Tab title="全部" key={DEFAULT_TYPE} />
      {data.map((item) => (
        <Tabs.Tab title={item.title} key={item.key} />
      ))}
    </Tabs>
  );
};

export default TypeSelect;
