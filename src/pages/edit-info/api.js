import Https from '../../utils/https';

const getUserInfoReq = params => Https.get(`/api/app/user/${params}`);

export {getUserInfoReq};