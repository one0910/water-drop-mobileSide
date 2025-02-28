import { GET_CARDS, GET_USE_CARDS } from '@/graphql/card';
import { TCardRecordsQuery } from '@/utils/types';
import { useQuery } from '@apollo/client';

//目前會員(學員)購買商品(課程)後，他所擁用的消費費卡資料API的hook
export const useCards = () => {
  const { loading, data } = useQuery<TCardRecordsQuery>(GET_CARDS, {
    variables: {
      page: {
        pageSize: 100,
        pageNum: 1,
      },
    },
  });

  return {
    loading,
    data: data?.getCardRecordsForH5.data,
  };
};

// 獲取某一個課程可用的消费卡API的hook
export const useUseCards = (courseId: string) => {
  const { loading, data } = useQuery<TCardRecordsQuery>(GET_USE_CARDS, {
    variables: {
      courseId,
    },
  });

  return {
    loading,
    data: data?.getUseCardRecordsByCourse.data,
  };
};
