import { SCHEDULE_STATUS } from './constants';

export interface IStudent {
  id: string;
  tel: string;
  name: string;
  avatar: string;
  openid: string;
}

export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface IPropChild {
  children: React.ReactNode;
}

export interface IProductType {
  key: string;
  title: string;
}

/**
 * 图片
 */
export interface IImage {
  id: number;
  url: string;
  remark?: string;
}

/**
 * 课程类型
 */
export interface ICourse {
  id: string;
  name: string; // 标题
  desc?: string;
  group?: string; // 适龄人群
  baseAbility?: string;
  limitNumber: number; // 限制人数
  duration: number; // 持续时长
  reserveInfo?: string;
  refundInfo?: string;
  otherInfo?: string;
  coverUrl?: string; // 封面图
  teachers?: ITeacher[]; // 讲师，多个
}

/**
 * 门店
 */
export interface IOrganization {
  id: string;
  orgFrontImg?: IImage[];
  orgRoomImg?: IImage[];
  orgOtherImg?: IImage[];
  name: string;
  logo?: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: string;
  latitude?: string;
  courses?: ICourse[];
}

/**
 * 消费卡
 */
export interface ICard {
  id: string;
  name: string;
  type: string;
  time: number;
  validityDay: number;
  course: ICourse;
}

/**
 * 商品类型
 */
export interface IProduct {
  id: string;
  limitBuyNumber: number;
  name: string;
  reason: string;
  coverUrl: string;
  bannerUrl: string;
  desc: string;
  originalPrice: number;
  stock: number;
  status: string;
  tags?: string;
  curStock: number;
  buyNumber?: number;
  preferentialPrice: number;
  displayType: string;
  distance?: string;
  org: IOrganization;
  cards?: ICard[];
}
export type TBaseQuery<T = null> = { [key: string]: { __typename?: 'Query', data: T, page: IPage, code: number, message: string } };
export type TProductTypeQuery = TBaseQuery<IProductType[]>;
export type TProductsQuery = TBaseQuery<IProduct[]>;
export type TProductQuery = TBaseQuery<IProduct>;

export type TOrgQuery = TBaseQuery<IOrganization>;
export type TOrgsQuery = TBaseQuery<IOrganization[]>;

export type TCourse = ICourse & { cardName: string };

export interface IWxConfig {
  appId: string;
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: string;
  paySign: string;
}

/**
 * 個人消费卡
 */
export interface ICardRecord {
  id: string;
  startTime: string;
  endTime: string;
  buyTime: string;
  residueTime: number; // 剩餘次數
  status: string;
  card: ICard;
  org: IOrganization;
}

export interface ITeacher {
  id: string;
  name: string;
  photoUrl: string;
}

// 課程表
export interface ISchedule {
  id: string;
  startTime: string;
  endTime: string;
  buyTime: string;
  schoolDay: string; // 上课日期
  course: ICourse;
  teacher: ITeacher;
}

export interface IScheduleRecord {
  id: string;
  subscribeTime: string;
  tel: string;
  status: keyof typeof SCHEDULE_STATUS;
  course: ICourse;
  student: IStudent;
  schedule: ISchedule;
  org: IOrganization;
}

export type TSchedulesQuery = TBaseQuery<ISchedule[]>;
export type TWxConfigQuery = TBaseQuery<IWxConfig>;

export type TCardRecordsQuery = TBaseQuery<ICardRecord[]>;
export type TScheduleRecordsQuery = TBaseQuery<IScheduleRecord[]>;
