import { gql } from "@apollo/client";

//取得微信配置訊息的API，用以做微信支援(目共我的程式碼並沒有真正接上微信的API，都只是在模擬流程)
export const GET_WXPAY_CONFIG = gql`
mutation getWxpayConfig($productId: String!, $quantity: Float!, $amount: Float!){
  getWxpayConfig(productId: $productId, quantity: $quantity, amount: $amount){
    code
    data {
      appId
      timeStamp
      nonceStr
      package
      signType
      paySign
    }
    message
  }
}
`;

/*這邊寫一個模擬訂單的API*/
export const MOCK_ORDER = gql`
  mutation mockOrderGenerator($productId: String!, $quantity: Float!, $amount: Float!){
    mockOrderGenerator(productId: $productId, quantity: $quantity, amount: $amount){
      code
      message
    }
}`;