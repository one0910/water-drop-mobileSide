import { gql } from '@apollo/client';

//獲取當前會員(學員)的消費卡裡所關聯的可預約課程的API
export const GET_CAN_SUBSCRIBE_COURSES = gql`
query getCanSubscribeCourses {
  getCanSubscribeCourses {
    data {
      id
      logo
      name
      courses {
        id
        coverUrl
        name
        teachers {
          id
          name
        }
      }
    }
  }
}
`;

//獲取某一個課程的近七天的課程表API
export const GET_SCHEDULES_BY_COURSE = gql`
  query getSchedulesByCourse($courseId: String!){
    getSchedulesByCourse(courseId: $courseId){
      code
      message
      data {
        id
        schoolDay
        startTime
        endTime
      }
      page {
        total
      }
    }
}`;

//預約課程API
export const SUBSCRIBE_COURSE = gql`
mutation subscribeCourse($scheduleId: String!, $cardId: String!) {
  subscribeCourse(scheduleId: $scheduleId, cardId: $cardId) {
    code
    message
  }
}`;

//獲取某個會員(學員)已預約課程的資料API
export const GET_SCHEDULE_RECORD = gql`
query getScheduleRecords($page: PageInput!) {
  getScheduleRecords(page: $page) {
    code
    data {
      id
      schedule {
        schoolDay
        startTime
        endTime
        teacher {
          name
          id
        }
      }
      status
      course {
        name
        coverUrl
      }
      org {
        name
        id
        logo
      }
    }
    message
  }
}`;

//取消所預約課程API
export const CANCEL_SUBSCRIBE = gql`
  mutation cancelSubscribeCourse($scheduleRecordId: String!) {
    cancelSubscribeCourse(scheduleRecordId: $scheduleRecordId) {
      code
      message
    }
  }
`;