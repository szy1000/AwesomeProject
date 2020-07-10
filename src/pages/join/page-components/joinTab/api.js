import Https from '../../../../utils/https';

const getDataReq = params => Https.get('/api/app/note/mine', params);

export {getDataReq};
