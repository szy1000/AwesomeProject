import Https from '../../utils/https';

const getGroupDetailReq = params => Https.get(`/api/app/forum/group/${params}`);

const joinGroupReq = params =>
  Https.post(`/api/app/forum/group/${params.id}/join`, {}, true);

const unjoinGroupReq = params =>
  Https.post(`/api/app/forum/group/${params.id}/unjoin`, {}, true);

export {getGroupDetailReq, joinGroupReq, unjoinGroupReq};
