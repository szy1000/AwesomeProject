import Https from '../../utils/https';

const getMessageReq = params => Https.get('/api/app/country', params);

export {getMessageReq};
