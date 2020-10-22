import Https from '../../utils/https';

const getCodeReq = params =>
  Https.post('/api/app/verificationCode/send', params, true);

const postRegisterReq = params =>
  Https.post('/api/app/user/register', params, true);

export {getCodeReq, postRegisterReq};
