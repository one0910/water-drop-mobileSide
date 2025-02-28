export const AUTH_TOKEN = 'mobile_auth_token';
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_TYPE = 'all';
export const DISABLE_DEV = import.meta.env.NODE_ENV !== 'production';
export const DAY_FORMAT = 'YYYY-MM-DD';
export const CARD_TYPE = {
  TIME: ['time', '次數卡'],
  DURATION: ['duration', '時長卡'],
};
export const CARD_STATUS = {
  VALID: 'VALID', // 有效
  EXPIRED: 'EXPIRED', // 過期
  DEPLETE: 'DEPLETE', // 點數已使用完
};

// 課程記錄的狀態
export const SCHEDULE_STATUS = {
  NO_DO: ['NO_DO', 'primary', '未開始'], // 未開始
  DOING: ['DOING', 'success', '上課中'], // 正在上課中
  FINISH: ['FINISH', 'default', '下課了'], // 上完課了
  COMMENTED: ['COMMENTED', 'warning', '已評估'], // 已評價
  CANCEL: ['CANCEL', 'danger', '已取消'], // 已取消
};