import Https from '../../utils/https';

const loginReq = params => Https.post('/api/app/user/login', params, true);
const loginByWechatReq = params =>
  Https.post('/api/app/user/wechat_login', params, true);

export {loginReq, loginByWechatReq};
