import Https from '../../utils/https';

const getAllCategoryReq = () => Https.get('/api/app/forum/groupCategory');
const getHotGroupReq = params => Https.get('/api/app/forum/group/hot', params);
const joinGroupReq = params =>
  Https.post(`/api/app/forum/group/${params}/join`, {}, true);

const unjoinGroupReq = params =>
  Https.post(`/api/app/forum/group/${params}/unjoin`, {}, true);

export {getAllCategoryReq, getHotGroupReq, joinGroupReq, unjoinGroupReq};
