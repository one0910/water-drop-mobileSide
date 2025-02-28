import style from './index.module.less';
import dayjs from 'dayjs';
import { Button, Divider, Selector, Tabs, Toast } from 'antd-mobile';
import { useSchedulesByCourse, useSubscribeCourse } from '@/services/schedule';
import { useMemo, useState } from 'react';
import { getDayTw } from '@/utils';
import { useUseCards } from '@/services/card';
import ConsumeCard from '../ConsumeCard';


interface IProps {
  courseId: string;
  onClose: () => void;
}


/**
* 預約課程彈窗，可以選擇課程表和消費卡
*/
const SubscribePopup = ({ courseId, onClose }: IProps) => {
  const { data } = useSchedulesByCourse(courseId);
  const { data: cards } = useUseCards(courseId);
  const [selectSchedule, setSelectSchedule] = useState<string[]>([]);
  const [selectCard, setSelectCard] = useState<string[]>([]);
  const { subscribe, loading } = useSubscribeCourse();

  //從後端取得的可約課程的相關資料，在這裡做一些整理，習慣上我們用useMemo包起來，並透過其依賴條件變化時才會執行裡面的運算
  const weeks = useMemo(() => {
    const weeksEachDay = [];
    //用一個簡單的for循環，來做出星期一~星期天
    for (let i = 1; i < 8; i++) {
      //1.先透過dayjs().add()，取得隔天為星期幾
      const day = dayjs().add(i, 'day');
      //2.由於透過dayjs取得的星期幾為英文，因此轉為中文的幾期幾
      const day_TW = getDayTw(day.format('dddd'))
      //3.由於後端取得課程的可約日期及時間是一組陣列，我們可以用filter並搭配day.isSame()將其當天對應的資料抽出來
      const timesDate = data?.filter((item) => day.isSame(item.schoolDay, 'day'));
      /*4.將其上課的日期及時間抽出來後，再整理一下並放入至一個含有label及value的物件裡，
      {lebel:'',value:''}這樣的物件類型可以搭配antd的組件,當選取到該組件時，就可以取得相應的value的值*/
      const bookableTime = timesDate?.map((time) => ({
        //用slice把像08:00:00的時間字串修減為08:00
        label: `${time.startTime.slice(0, 5)}-${time.endTime.slice(0, 5)}`,
        value: time.id,
      }));
      weeksEachDay.push({
        weekLabel: day_TW,
        weekValue: day.format('dddd'),
        date: day.format('M/D'),
        bookableTime,
      });
    }
    return weeksEachDay
  }, [data])

  const newCards = useMemo(() => cards?.map((item) => ({
    label: <ConsumeCard dataSource={item} />,
    value: item.id,
  })), [cards]);

  //按下立即預約按鈕
  const subscribeHandler = async () => {
    if (selectSchedule.length === 0 || selectCard.length === 0) {
      Toast.show({
        content: '請選擇對應的上課時間和消費卡',
        duration: 3000
      });
      return;
    }
    const res = await subscribe(selectSchedule[0], selectCard[0]);
    if (res?.code === 200) {
      Toast.show({
        content: res.message,
        duration: 3000
      });
      onClose();
      return;
    }
    Toast.show({
      content: res?.message,
      duration: 3000
    });
  };

  return (
    <div className={style.container}>
      <Divider>請選擇預約時間</Divider>
      <Tabs>
        {weeks.map((week) => (
          <Tabs.Tab title={`${week.weekLabel}(${week.date})`} key={week.weekValue}>
            <Selector
              columns={3}
              options={week.bookableTime || []}
              onChange={(arr) => setSelectSchedule(arr)} //選擇到哪個時間段時,用useState來記錄該課程的id
            />
          </Tabs.Tab>
        ))}
      </Tabs>
      <Divider>請選擇消費卡</Divider>
      <Selector
        columns={1}
        onChange={(arr) => setSelectCard(arr)}
        options={newCards || []}
      />
      <Divider />
      <Button
        color='primary'
        loading={loading}
        className={style.button}
        onClick={subscribeHandler}
      >立即預約</Button>
    </div>
  );
};

export default SubscribePopup;
