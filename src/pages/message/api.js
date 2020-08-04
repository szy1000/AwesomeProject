import Https from '../../utils/https';

const getMessageReq = params => Https.get('/api/app/message', params);
const postReadAllReq = params =>
  Https.post('/api/app/message/read_all', params);

export {getMessageReq, postReadAllReq};
