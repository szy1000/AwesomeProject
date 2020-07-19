import Https from '../../utils/https';

const getUserInfoReq = params => Https.get(`/api/app/user/${params}`);
const changeUserInfoReq = params => Https.put('/api/app/user', params, true);

const uploadImageFileReq = params =>
  Https.post('/api/common/file/image', params);

export {getUserInfoReq, changeUserInfoReq, uploadImageFileReq};
