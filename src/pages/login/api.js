import Https from '../../utils/https';

const loginReq = params => Https.post('/api/app/user/login', params, true);

const loginByWechatReq = params =>
  Https.post('/api/app/user/wechat_login', params, true);

const bindByWechatReq = params =>
  Https.post('/api/app/user/wechat_bind', params, true);

const getWechatTokenReq = params =>
  Https.get('https://api.weixin.qq.com/sns/oauth2/access_token', params, true);
const getWechatReq = params =>
  Https.get('https://api.weixin.qq.com/sns/userinfo', params, true);

export {
  loginReq,
  bindByWechatReq,
  loginByWechatReq,
  getWechatTokenReq,
  getWechatReq,
};
