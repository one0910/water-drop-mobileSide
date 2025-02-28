import { CANCEL_SUBSCRIBE, GET_CAN_SUBSCRIBE_COURSES, GET_SCHEDULE_RECORD, GET_SCHEDULES_BY_COURSE, SUBSCRIBE_COURSE } from '@/graphql/schedule';
import { TBaseQuery, TOrgsQuery, TScheduleRecordsQuery, TSchedulesQuery } from '@/utils/types';
import { useMutation, useQuery } from '@apollo/client';

//獲取當前會員(學員)的消費卡裡所關聯的可預約課程API資料的hook
export const useCanSubscribeCourses = () => {
  const { loading, data } = useQuery<TOrgsQuery>(GET_CAN_SUBSCRIBE_COURSES);

  return {
    loading,
    data: data?.getCanSubscribeCourses.data,
  };
};


// 獲取某一個課程的近七天的課程表API的hook
export const useSchedulesByCourse = (courseId: string) => {
  const { loading, data } = useQuery<TSchedulesQuery>(GET_SCHEDULES_BY_COURSE, {
    variables: {
      courseId,
    },
  });

  return {
    loading,
    data: data?.getSchedulesByCourse.data,
  };
};

// 預約課程API的hook
export const useSubscribeCourse = () => {
  const [subscribe, { loading }] = useMutation<TBaseQuery>(SUBSCRIBE_COURSE);

  const subscribeHandler = async (
    scheduleId: string,
    cardId: string,
  ) => {
    const res = await subscribe({
      variables: {
        scheduleId,
        cardId,
      },
    });
    return res.data?.subscribeCourse;
  };

  return {
    subscribe: subscribeHandler,
    loading,
  };
};

// 獲取某個會員(學員)已預約課程的資料API的hook
export const useScheduleRecords = () => {
  const { data, refetch, loading } = useQuery<TScheduleRecordsQuery>(GET_SCHEDULE_RECORD, {
    variables: {
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    },
  });

  return { data: data?.getScheduleRecords.data, loading, refetch };
};

// 取消所預約課程API的hook
export const useCancelSubscribeCourse = () => {
  const [cancel, { loading }] = useMutation<TBaseQuery>(CANCEL_SUBSCRIBE);

  const cancelHandler = async (scheduleRecordId: string,) => {
    const res = await cancel({
      variables: {
        scheduleRecordId,
      },
    });
    return res.data?.cancelSubscribeCourse;
  };

  return {
    cancel: cancelHandler,
    loading,
  };
};