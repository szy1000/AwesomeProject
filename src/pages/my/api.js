import Https from '../../utils/https';

const getUserInfoReq = params => Https.get(`/api/app/user/${params}`);
const getUserStatReq = params => Https.get('/api/app/user/action_statistics');

export {getUserInfoReq, getUserStatReq};
