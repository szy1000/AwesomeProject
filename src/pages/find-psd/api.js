import Https from '../../utils/https';

const getCodeReq = params =>
  Https.post('/api/app/verificationCode/send', params, true);
const resetPsdReq = params =>
  Https.post('/api/app/user/reset_password', params, true);

export {getCodeReq, resetPsdReq};
