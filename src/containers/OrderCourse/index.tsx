import style from './index.module.less';
import { Popup, Steps } from 'antd-mobile';
import { useCanSubscribeCourses } from '@/services/schedule';
import CourseList from './components/CourseList';
import { useState } from 'react';
import SubscribePopup from './components/SubscribePopup';

const { Step } = Steps;
/**
* 預約課程
*/
const OrderCourse = ({ }) => {
  const [curCourse, setCurCourse] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { data } = useCanSubscribeCourses();

  //當按下預約的按鈕
  const onSubscribeHandler = (id: string) => {
    setShowPopup(true);
    setCurCourse(id);
  };
  //關閉Popup彈窗
  const onCloseHandler = () => {
    /*curCourse設置為空有個好處，當它為空時它會銷毀SubscribePopup組件，
    所以只要在畫面中有渲染出SubscribePopup組件，它就會去執行組件裡的後端query程序*/
    setCurCourse('');
    setShowPopup(false);
  };

  return (
    <div className={style.container}>
      <Steps
        direction="vertical"
      >
        {data?.map((item) => (
          <Step
            title={item.name}
            key={item.id}
            icon={(
              <img
                className={style.logo}
                src={item.logo}
                alt="門市logo"
              />
            )}
            description={item.courses ? (
              <CourseList
                onSubscribe={onSubscribeHandler}
                dataSource={item.courses}
              />
            ) : null}
          />
        ))}
      </Steps>
      <Popup
        visible={showPopup}
        position="bottom"
        onMaskClick={onCloseHandler}
        onClose={onCloseHandler}
      >
        {curCourse
          && <SubscribePopup onClose={onCloseHandler} courseId={curCourse} />}
      </Popup>
    </div>
  );
};

export default OrderCourse;
