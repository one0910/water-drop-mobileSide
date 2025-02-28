import { NumberKeyboard, PasscodeInput, Popup, Toast } from 'antd-mobile';
import { useMockOrder } from '@/services/order';
import style from './index.module.less';

interface IProps {
  onClose: () => void;
  amount: number;
  visible: boolean;
  productId: string;
  quantity: number;
  onFinish: (result: boolean) => void;
}
/**
* 微信支付窗
*/
const WxPay = ({ onClose, visible, amount, productId, quantity, onFinish }: IProps) => {
  const { get } = useMockOrder();
  const onChangeHandler = async (value: string) => {
    if (value.length > 5) {
      //輸入的支付碼需大於5碼，才會進行後端支付程序
      const res = await get(productId, quantity, amount);
      console.log(`res => `, res)
      if (res.code !== 200) {
        Toast.show({
          content: res.message,
          duration: 5000
        });
        onFinish(false);
        return;
      }

      Toast.show({
        content: res.message,
        duration: 5000
      });
      onFinish(true);
    }
  };

  return (
    <Popup
      visible={visible}
      showCloseButton
      onMaskClick={() => { onClose() }}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    >
      <div className={style.container}>
        <div className={style.title}>請輸入支付密碼</div>
        <div className={style.desc}>黑石之支付服務平台</div>
        <div className={style.amount}> $NT{amount} </div>
        <PasscodeInput
          seperated
          onChange={onChangeHandler}
          keyboard={<NumberKeyboard />}
        />
      </div>
    </Popup>
  );
};
export default WxPay;
