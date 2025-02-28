import { Button, Image, List } from 'antd-mobile';
import { ICourse, ITeacher } from '@/utils/types';
import style from './index.module.less';

interface IProps {
  dataSource: ICourse[];
  onSubscribe: (id: string) => void; //上層傳下來的預約按鈕功能
}

/**
* 課程列表
*/
const CourseList = ({ dataSource, onSubscribe }: IProps) => (
  <div className={style.container}>
    <List>
      {dataSource.map((item) => (
        <List.Item
          key={item.id}
          prefix={
            (
              <Image
                src={item.coverUrl}
                alt="課程圖片"
                className={style.coverUrl}
              />
            )
          }
          extra={
            (
              <Button
                fill="none"
                color="primary"
                onClick={() => onSubscribe(item.id)}
              >
                預約
              </Button>
            )
          }
          description={
            item.teachers?.map((it: ITeacher) => it.name).join('，')
          }
        >
          {item.name}
        </List.Item>
      ))}
    </List>
  </div>
);

export default CourseList;
