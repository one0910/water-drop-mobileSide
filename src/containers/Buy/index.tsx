import { useState } from 'react';

import style from './index.module.less';
import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/services/product';
import { Grid, Stepper, Toast } from 'antd-mobile';
import HorizontalLine from '@/components/HorizontalLine';
import { useUserContext } from '@/hooks/userHooks';
import { useWxpayConfig } from '@/services/order';
import FailResult from './components/FailResult';
import SuccessResult from './components/SuccessResult';
import WxPay from '@/components/WxPay';
import { DISABLE_DEV } from '@/utils/constants';
import { uniqueId } from 'lodash';
const { WeixinJSBridge } = window as any;

/**
*購買商品訊息頁
*/
const Buy = () => {
  const { id = '' } = useParams();
  const { data } = useProductInfo(id);
  const [count, setCount] = useState<number>(1);
  const { store, setStore } = useUserContext();
  const [showResult, setShowResult] = useState({
    showSuccess: false,
    showFail: false,
  });
  const { getWxConfig } = useWxpayConfig();
  const [openPay, setOpenPay] = useState<boolean>(false);

  const buyHandler = async () => {
    //在development開發模式下，則直接進入模擬微信支付的API
    if (DISABLE_DEV) {
      setStore({ openid: uniqueId() });
      setOpenPay(true);
      return;
    }

    /*若後端沒有回傳openid，則先跳至/wx/login這個路由(並帶用?userId的query)向後端去取opneid，
    取得openid後，再透過&url=${window.location.href}跳轉回目前頁*/
    if (!store.openid) {
      window.location.href = `${import.meta.env.VITE_APP_REMOTE_URL}/wx/login?userId=${store.id}&url=${window.location.href}`;
      return;
    }

    if (!data || !id) {
      Toast.show({
        content: '没有獲取到商品訊息',
      });
      return;
    }

    /*這裡是若有真確的登入微信後，window.WeixinJSBridge就會有資料代表目前網頁是有微信登入凡狀態，
    但由於這裡先用模擬的方式並沒有真的接上微信登入的API，所以這裡並不會做實際的微信登入*/
    if (typeof WeixinJSBridge !== 'undefined') {
      const wxConfig = await getWxConfig(
        id,
        count,
        data.preferentialPrice * count,
      );

      // 有限購
      if (!wxConfig) return;
      // WeixinJSBridge.invoke(
      //   'getBrandWCPayRequest',
      //   {
      //     ...wxConfig,
      //   },
      //   (res: { err_msg: string }) => {
      //     if (res.err_msg === 'get_brand_wcpay_request:ok') {
      //       // 使用以上方式判断前端返回,微信团队郑重提示：
      //       // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      //       setShowResult({
      //         showSuccess: true,
      //         showFail: false,
      //       });
      //       return;
      //     }
      //     setShowResult({
      //       showSuccess: false,
      //       showFail: true,
      //     });
      //   },
      // );
    } else {
      //由於是沒有真進入微信登入的狀態，所以這裡無論如何都會進入到else然後去後端透過getWxConfig()去取得微信配置資訊
      const wxConfigData = await getWxConfig(
        id,
        count,
        data.preferentialPrice * count,
      );
      if (!wxConfigData) {
        return
      }
      setShowResult({
        showSuccess: true,
        showFail: false,
      });
      // Toast.show({
      //   content: '請在微信中打開該頁面',
      // });
    }
  }

  if (!data) {
    return null;
  }

  const onWxpayCloseHandler = () => {
    setOpenPay(false);
  };

  const onFinishHandler = (result: boolean) => {
    // 支付成功
    if (result) {
      setShowResult({
        showSuccess: true,
        showFail: false,
      });
      return;
    }
    // 支付失敗
    setShowResult({
      showSuccess: false,
      showFail: true,
    });
  };

  //若購買失敗
  if (showResult.showFail) {
    return (
      <FailResult
        price={data.preferentialPrice * count}
        orgName={data.org.name}
      />
    );
  }

  //若購買成功
  if (showResult.showSuccess) {
    return (
      <SuccessResult
        price={data.preferentialPrice * count}
        orgName={data.org.name}
        productName={data.name}
        productDesc={data.desc}
      />
    );
  }


  //微信支付流程
  return (
    <div className={style.container}>
      <WxPay
        visible={openPay}
        onClose={onWxpayCloseHandler}
        amount={data.preferentialPrice * count}
        onFinish={onFinishHandler}
        productId={id}
        quantity={count}
      />
      <div className={style.organization}>
        <div className={style.logo}>
          <img
            alt=""
            src={data.org.logo}
            className={style.logoImg}
          />
        </div>
        <div className={style.orgName}>{data.org.name}</div>
      </div>
      <HorizontalLine />
      <div className={style.title}>
        {data.name}
      </div>
      <div className={style.desc}>
        {data.desc}
      </div>
      <HorizontalLine />
      <div className={style.count}>
        購買數量
        <Stepper
          className={style.step}
          value={count}
          onChange={(value) => {
            setCount(value);
          }}
        />
      </div>
      <div className={style.price}>
        小計: NT$
        {data.preferentialPrice * count}
        <span className={style.originalPrice}>
          NT$
          {data.originalPrice * count}
        </span>
      </div>
      <HorizontalLine />
      <div className={style.user}>
        <span className={style.telLabel}>
          手機號碼
        </span>
        <span className={style.tel}>
          {store.tel}
        </span>
      </div>

      {/* 畫面底部價格顯示及結帳按鈕 */}
      <Grid
        columns={2}
        className={style.buyContainer}
      >
        <Grid.Item span={1}>
          <span className={style.preferentialPrice}>
            NT$
            {data.preferentialPrice * count}
          </span>
          <span className={style.originalPrice}>
            NT$
            {data.originalPrice * count}
          </span>
        </Grid.Item>
        <Grid.Item
          span={1}
          className={style.buyButton}
          onClick={buyHandler}
        >
          {store.openid ? '提交訂單' : '去微信授權'}
        </Grid.Item>
      </Grid>
    </div>

  );
};

export default Buy;
