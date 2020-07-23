import Https from '../../utils/https';

const getUserInfoReq = params => Https.get(`/api/app/user/${params}`);
const submitForumReq = params =>
  Https.post('/api/app/forum/discussion', params, true);

const uploadImageFileReq = params =>
  Https.post('/api/common/file/image', params);

export {getUserInfoReq, submitForumReq, uploadImageFileReq};
