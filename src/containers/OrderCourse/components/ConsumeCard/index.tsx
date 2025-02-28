import { ICardRecord } from '@/utils/types';
import { Space, Tag } from 'antd-mobile';
import { CARD_TYPE, DAY_FORMAT } from '@/utils/constants';
import dayjs from 'dayjs';
import style from './index.module.less';

interface IProps {
  dataSource: ICardRecord;
}
/**
* 消费卡的展示
*/
const ConsumeCard = ({ dataSource }: IProps) => {

  return (
    <div className={style.container}>
      <Space justify="between" block>
        <span>
          {dataSource.card.type === CARD_TYPE.TIME[0]
            && (
              <Tag
                color="primary"
                fill="outline"
              >
                {CARD_TYPE.TIME[1]}
              </Tag>
            )}
          {dataSource.card.type === CARD_TYPE.DURATION[0]
            && (
              <Tag
                color="warning"
                fill="outline"
              >
                {CARD_TYPE.DURATION[1]}
              </Tag>
            )}
          <span className={style.name}>
            {dataSource.card.name}
          </span>
        </span>
        <span>
          有效期至：{dayjs(dataSource.endTime).format(DAY_FORMAT)}
        </span>
      </Space>
      {dataSource.card.type === CARD_TYPE.TIME[0] && (
        <Space justify="between" block className={style.residueTime}>
          <span>剩餘 {dataSource.residueTime} 次 </span>
        </Space>
      )}
    </div>
  )
}

export default ConsumeCard;
