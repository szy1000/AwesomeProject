import Https from '../../../../utils/https';

const getDataReq = params => Https.get('/api/app/forum/group/mine', params);

export {getDataReq};
