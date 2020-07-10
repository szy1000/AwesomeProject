import Https from '../../utils/https';

const getGroupDetailReq = params => Https.get(`/api/app/forum/group/${params}`);

export {getGroupDetailReq};
