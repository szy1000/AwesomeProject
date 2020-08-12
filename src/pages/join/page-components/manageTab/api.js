import Https from '../../../../utils/https';

const getDataReq = params =>
  Https.get('/api/app/forum/discussion/mine', params);

export {getDataReq};
