import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '../graphql/oss';


/**
*1.獲取簽名訊息
*2.fetch post請求參數傳到服務端
*/
const useUploadOSS = () => {
  //先從後端取得上傳至阿里雲的相關所需資料，例如bucket域名、密鑰(key)、簽名(signature)、token、過期時間
  const { data: OSSData } = useQuery(GET_OSS_INFO)

  const uploadHandler = async (file: File) => {
    const formData = new FormData()
    const data = OSSData.getOSSInfo
    const path = `${data.dir}/${file.name}`
    formData.append('key', path);
    formData.append('policy', data.policy);
    formData.append('OSSAccessKeyId', data.accessId);
    formData.append('success_action_status', '200');
    formData.append('signature', data.signature);
    formData.append('file', file);
    const res = await fetch(data.host, {
      method: 'POST',
      body: formData
    })
    return { url: res.url + path }
  }
  return uploadHandler
};

export default useUploadOSS;
