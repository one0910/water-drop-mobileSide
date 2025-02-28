import { GET_WXPAY_CONFIG, MOCK_ORDER } from "@/graphql/order";
import { TWxConfigQuery } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { Toast } from "antd-mobile";

//取得微信配置訊息的API的hook，用以做微信支援(目共我的程式碼並沒有真正接上微信的API，都只是在模擬流程)
export const useWxpayConfig = () => {
  const [get, { loading }] = useMutation<TWxConfigQuery>(GET_WXPAY_CONFIG);

  const getHandler = async (productId: string, quantity: number, amount: number) => {
    const res = await get({
      variables: {
        productId,
        amount,
        quantity,
      },
    });

    // 課程限購邏輯
    if (res.data?.getWxpayConfig.code === 10031) {
      Toast.show({
        content: res.data?.getWxpayConfig.message,
        duration: 5000
      });
      return null;
    }
    return res.data?.getWxpayConfig.data;
  };

  return {
    getWxConfig: getHandler,
    loading,
  };
};

//模擬訂單API的hook
export const useMockOrder = () => {
  const [get, { loading }] = useMutation(MOCK_ORDER);

  const getHandler = async (
    productId: string,
    quantity: number,
    amount: number,
  ) => {
    const res = await get({
      variables: {
        productId,
        amount,
        quantity,
      },
    });
    return res.data?.mockOrderGenerator;
  };

  return {
    get: getHandler,
    loading,
  };
};
