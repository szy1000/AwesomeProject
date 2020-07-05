import Https from '../../utils/https';

const postRegisterReq = params => Https.post('/api/app/user/register', params);

export {postRegisterReq};
