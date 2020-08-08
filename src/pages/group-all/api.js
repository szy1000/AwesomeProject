import Https from '../../utils/https';

const getAllCategoryReq = () => Https.get('/api/app/forum/groupCategory');

const getGroupListReq = params => Https.get('/api/app/forum/group', params);

const joinGroupReq = params =>
  Https.post(`/api/app/forum/group/${params.id}/join`, {}, true);

const unjoinGroupReq = params =>
  Https.post(`/api/app/forum/group/${params.id}/unjoin`, {}, true);

export {getAllCategoryReq, getGroupListReq, joinGroupReq, unjoinGroupReq};
