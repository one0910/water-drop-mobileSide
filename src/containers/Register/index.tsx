import style from './index.module.less';
import { Button, Form, Input, Space } from 'antd-mobile';
import { useMutation } from '@apollo/client';
import { STUDENT_REGISTER } from '@/graphql/user';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { showFail, showSuccess } from '@/utils';

interface IValue {
  password: string;
  account: string;
}
/**
* 註冊
*/
const Register = ({ }) => {
  const [form] = Form.useForm();
  const [register, { loading }] = useMutation(STUDENT_REGISTER);
  const nav = useNavigate();

  //當按下註冊鈕時
  const onRegisterHandler = async (values: IValue) => {
    const res = await register({
      variables: {
        account: values.account,
        password: md5(values.password),
      },
    });
    if (res.data.studentRegister.code === 200) {
      showSuccess(res.data.studentRegister.message);
      nav('/login');
      return;
    }
    const data = res.data.studentRegister;
    showFail(data);
  }

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="" />
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onRegisterHandler}
        footer={(
          <Button loading={loading} block type="submit" color="primary" size="large">
            註冊
          </Button>
        )}
      >
        <Form.Item
          rules={[{
            required: true,
            message: '用户名不能为空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: '有且只能包含小寫字母和數字，長度大於 6，小於 10',
          }]}
          label="用户名"
          name="account"
        >
          <Input placeholder="請輸入用户名" clearable />
        </Form.Item>
        <Form.Item
          label="輸入密碼"
          name="password"
          rules={[{
            required: true,
            message: '密碼不能為空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: '有且只能包含小寫字母和數字，長度大於 6',
          }]}
        >
          <Input
            placeholder="請輸入密碼"
            clearable
            type="password"
          />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: '密碼不能為空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: '有且只能包含小寫字母和數字，長度大於 6',
          }, {
            validator: (_, value) => {
              const password = form.getFieldValue('password');
              if (password === value) {
                return Promise.resolve();
              }
              return Promise.reject();
            },
            message: '兩次事入的密碼需要一致',
          }]}
          label="確認密碼"
          name="passwordConfirm"
        >
          <Input
            placeholder="請再次輸入密碼"
            clearable
            type="password"
          />
        </Form.Item>
      </Form>
      <div>
        <Space>
          已有帳號？前往
          <Link to="/login">登錄頁</Link>
        </Space>
      </div>
    </div>
  );
};

export default Register;
