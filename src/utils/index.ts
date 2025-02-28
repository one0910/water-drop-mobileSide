import { Toast } from "antd-mobile";

export const showSuccess = (content: string) => {
  Toast.show({
    content,
    icon: 'success',
  });
};

export const showFail = ({ code, message }: { code: number, message: string }) => {
  Toast.show({
    content: `${code}：${message}`,
    icon: 'fail',
  });
};

// 把英文的星期幾轉為中文的星期幾
export const getDayTw = (day: string) => {
  const weekMap: Record<string, string> = {
    Sunday: '星期日',
    Monday: '星期一',
    Tuesday: '星期二',
    Wednesday: '星期三',
    Thursday: '星期四',
    Friday: '星期五',
    Saturday: '星期六',
  };

  return weekMap[day];
};