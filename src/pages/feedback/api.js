import Https from '../../utils/https';

const uploadImageFileReq = params =>
  Https.post('/api/common/file/image', params);
const getFeedBackReq = params => Https.post('/api/app/feedback', params, true);

export {uploadImageFileReq, getFeedBackReq};
