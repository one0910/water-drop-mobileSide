import { gql } from '@apollo/client';

//獲取目前會員(學員)購買商品(課程)後，他所擁用的消費費卡資料API
export const GET_CARDS = gql`
query getCardRecordsForH5($page: PageInput!){
  getCardRecordsForH5(page: $page){
    code
    page {
      total
      pageNum
      pageSize
    }
    data {
      id
      startTime
      endTime
      buyTime
      status
      residueTime
      card {
        id
        name
        type
        validityDay
      }
      org {
        id
        name
      }
    }
    message
  }
}
`;

// 獲取某一個課程可用的消费卡API
export const GET_USE_CARDS = gql`
  query getUseCardRecordsByCourse($courseId: String!){
    getUseCardRecordsByCourse(courseId: $courseId){
      code
      message
      data {
        id
        startTime
        endTime
        buyTime
        status
        residueTime
        card {
          id
          name
          type
        }
      }
      page {
        total
      }
    }
}`;
