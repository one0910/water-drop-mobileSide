import { useState } from 'react';
import md5 from 'md5';
import {
  Button, Form, Input, Space,
} from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';


import style from './index.module.less';
import { STUDENT_LOGIN } from '@/graphql/user';
import { showFail, showSuccess } from '@/utils';
import { AUTH_TOKEN } from '@/utils/constants';
import { useUserContext } from '@/hooks/userHooks';

interface IValue {
  password: string;
  account: string;
}

/**
* 登入頁面
*/
const Login = () => {
  const [visible, setVisible] = useState(false);
  const [login,] = useMutation(STUDENT_LOGIN);
  const { store } = useUserContext();
  const nav = useNavigate();

  //按下登入的按鈕時
  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });


    if (res.data.studentLogin.code === 200) {
      showSuccess(res.data.studentLogin.message);
      store.refetchHandler();
      localStorage.setItem(AUTH_TOKEN, res.data.studentLogin.data);
      nav('/');
      return;
    } else {
      showFail(res.data.studentLogin)
    }

  };
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="" />
      </div>
      <Form
        layout="horizontal"
        onFinish={loginHandler}
        footer={(
          <Button loading={false} block type="submit" color="primary" size="large">
            登錄
          </Button>
        )}
      >
        <Form.Item
          label="用户名"
          name="account"
          rules={[{
            required: true,
            message: '用户名不能為空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: '有且只能包含小寫字母和數字，長度大於6，小於 10',
          }]}
        >
          <Input placeholder="請輸入用户名" clearable />
        </Form.Item>
        <Form.Item
          label="密碼"
          name="password"
          rules={[{
            required: true,
            message: '密碼不能為空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: '有且只能包含小寫字母和數字，長度大於 ',
          }]}
          extra={(
            <div className={style.eye}>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          )}
        >
          <Input
            placeholder="請輸入密碼"
            clearable
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>
      <div className={style.test}>
        測試帳號：one0910
        密碼：123456a
      </div>
      <div>
        <Space>
          没有帳號？前往
          <Link to="/register">註冊頁</Link>
        </Space>
      </div>
    </div>
  );
};

export default Login;
