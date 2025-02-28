import { useProductInfo } from '@/services/product';
import style from './index.module.less';
import { useParams } from 'react-router-dom';
import { TCourse } from '@/utils/types';
import { useMemo } from 'react';
import BaseInfo from './BaseInfo';
import HorizontalLine from '@/components/HorizontalLine';
import CourseInfo from './CourseInfo';
import BuyBottom from './BuyBottom';
import { Result } from 'antd-mobile';

/**
* 課程(商品)詳情
*/
const ProductInfo = ({ }) => {
  const { id } = useParams();
  const { data } = useProductInfo(id || '');

  //取回來的data裡會有一個綁定消費卡的陣列資料，一個課程(商品)也綁定多張消費卡，所以我們另外將此多張消費卡做一些整理，將重覆的資訊整合在一起
  const courses = useMemo(() => {
    const cs: Record<string, TCourse> = {};
    //由於該課程(商品)會多張綁定消費卡，然後消費卡本身會有不同種類，因此我們可以先將消費卡的資料先遍歷出來，目的是要將相同課程(商品)資料的清費卡做一個整合
    data?.cards?.forEach((item) => {
      //把相同課程(商品)id的消費卡整合起來，放在一個格式為key:{}的物件裡(key為該消費卡id)，並將該消費卡的名稱用'/'符號合併
      cs[item.course.id] = {
        ...item.course,
        cardName: cs[item.course.id] ? (`${cs[item.course.id].cardName} / ${item.name}`) : item.name,
      };
    });
    return Object.values(cs);
  }, [data?.cards]);

  //data資料不能為空
  if (!data) {
    return (
      <Result
        status="warning"
        title="提示"
        description="無該課程(商品)資訊"
      />
    );
  }

  return (
    <div className={style.container}>
      <BaseInfo data={data} />
      <HorizontalLine />
      <CourseInfo data={courses} />
      <BuyBottom data={data} />
    </div>
  );
};

export default ProductInfo;
