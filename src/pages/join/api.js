import Https from '../../utils/https';

const getJoinReq = params => Https.get('/api/app/forum/group/mine', params);

const getMangeGroupReq = params =>
  Https.get('/api/app/forum/discussion/mine', params);

export {getJoinReq, getMangeGroupReq};
