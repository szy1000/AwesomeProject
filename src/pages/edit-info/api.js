import Https from '../../utils/https';

const getUserInfoReq = params => Https.get(`/api/app/user/${params}`);

const uploadFileReq = params => Https.post('/api/common/file');

export {getUserInfoReq, uploadFileReq};
