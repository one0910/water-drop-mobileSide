import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext, connectFactory } from '@/utils/contextFactory';
import { IStudent } from '../utils/types';
import { GET_STUDENT_INFO } from '../graphql/user';

const KEY = 'studentInfo';
const DEFAULT_VALUE = {

};

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetStudent = () => {
  const { setStore } = useUserContext();
  const navigate = useNavigate()
  const location = useLocation();
  const { loading, refetch } = useQuery<{ getStudentInfo: { data: IStudent } }>(GET_STUDENT_INFO, {
    onCompleted: (data) => {
      if (data.getStudentInfo) {
        const { id, name, tel, avatar, openid } = data.getStudentInfo.data;
        setStore({
          id, name, tel, avatar, openid, refetchHandler: refetch,
        });
        //只要有取得用戶資料，就無法再進入login頁面
        if (location.pathname.startsWith('/login')) {
          navigate(`/`)
        }
        return
      }
      //只要在後端沒有取得用戶資料，一律都進login頁面，就算是進到沒有路由的Page404，也會轉跳到Login頁面
      setStore({ refetchHandler: refetch }) //這裡的設置邏輯是只要在登錄頁面，就會在store設置refetch
      if (location.pathname !== '/login') {
        navigate(`/login?orgUrl=${location.pathname}`)
      }
    },
    onError: () => {
      //只要在後端沒有取得用戶資料，一律都進login頁面，就算是進到沒有路由的Page404，也會轉跳到Login頁面
      setStore({ refetchHandler: refetch })  //這裡的設置邏輯是只要在登錄頁面，就會在store設置refetch
      if (location.pathname !== '/login') {
        navigate(`/login?orgUrl=${location.pathname}`)
      }
    }
  });
  return { loading };
};
