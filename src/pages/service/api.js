import Https from '../../utils/https';

const queryServiceReq = params => Https.get('/api/app/customerService', params);
const sendServiceReq = params => Https.post('/api/app/customerService', params);

export {queryServiceReq, sendServiceReq};
