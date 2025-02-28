import { useParams } from 'react-router-dom';
import { useOrganization } from '@/services/org';
import { Result } from 'antd-mobile';
import BaseInfo from './components/BaseInfo';
import DescInfo from './components/DescInfo';
import RecommendProducts from './components/RecommendProducts';
import HorizontalLine from '@/components/HorizontalLine';
import style from './index.module.less';

/**
*門店詳情頁面
*/
const OrgInfo = ({ }) => {
  const { id } = useParams();
  const { data } = useOrganization(id || '');
  if (!data) {
    return <Result status="warning" title="提示" description="無門店資料" />;
  }
  return (
    <div className={style.container}>
      <BaseInfo data={data} />
      <HorizontalLine />
      <DescInfo data={data} />
      <HorizontalLine />
      <RecommendProducts orgId={id || ''} />
    </div>
  );
};

export default OrgInfo;
