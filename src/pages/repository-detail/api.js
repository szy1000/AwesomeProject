import Https from '../../utils/https';

const queryDetailReq = params =>
  Https.get(`/api/app/university/${params}`, params);

const queryInfoItemReq = params => Https.get('/api/app/infoItem/items', params);
const queryItemReq = params => Https.get('/api/app/infoItem/content', params);

export {queryDetailReq, queryInfoItemReq, queryItemReq};
