import Https from '../../../../utils/https';

const getGroupListReq = (params, groupId) =>
  Https.get(`/api/app/forum/group/${groupId}/discussion`, params);
export {getGroupListReq};
