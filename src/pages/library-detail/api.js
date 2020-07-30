import Https from '../../utils/https';

const querySubjectDetailReq = params =>
  Https.get(`/api/app/subject/${params}`, {});

const queryInfoItemReq = params => Https.get('/api/app/infoItem/items', params);
const queryContentReq = params =>
  Https.get('/api/app/infoItem/content', params);

export {querySubjectDetailReq, queryInfoItemReq, queryContentReq};
