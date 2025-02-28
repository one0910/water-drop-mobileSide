
import useUploadOSS from '@/hooks/useUploadOSS';
import { Button, Form, ImageUploader, Input } from 'antd-mobile'
import classNames from 'classnames';
import style from './index.module.less';
import { useUserContext } from '@/hooks/userHooks';
import { useEffect } from 'react';

/**
* 我的個人編輯頁面
*/

function EditInfo() {
  const uploadHandler = useUploadOSS()

  const [form] = Form.useForm();
  const { store } = useUserContext();

  useEffect(() => {
    // if (!store.tel) return;
    form.setFieldsValue({
      tel: store.tel,
      name: store.name,
      avatar: [{
        url: store.avatar,
      }],
    });
  }, [store])

  const onClickHandler = (value: any) => {
    console.log('value => ', value)
  }
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="" />
      </div>
      <Form
        form={form}
        className={classNames(style.form, style.formPadding)}
        onFinish={onClickHandler}
        footer={(
          <Button block type="submit" color="primary" size="large">
            送出
          </Button>
        )}
      >
        <Form.Header>請提交個人資料，都是必填的</Form.Header>
        <Form.Item
          name="name"
          label="匿稱"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tel"
          label="手機號碼"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="頭像"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ImageUploader
            maxCount={1}
            upload={uploadHandler}
          />
        </Form.Item>
      </Form>
    </div>

  )
}

export default EditInfo
