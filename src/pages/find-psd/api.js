import Https from '../../utils/https';

const loginReq = params => Https.post('/api/app/user/login', params, true);

export {loginReq};
