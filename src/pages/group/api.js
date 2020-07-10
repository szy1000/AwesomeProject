import Https from '../../utils/https';

const getGroupDetailReq = params => Https.get(`/api/app/forum/group/${params}`);
const getGroupListReq = (params, groupId) =>
  Https.get(`/api/app/forum/group/${groupId}/discussion`, params);

// const getGroupReq = params => Https.get(`/api/app/forum/group/${params}`);

export {getGroupDetailReq, getGroupListReq};
