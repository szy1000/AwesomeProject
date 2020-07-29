import Https from '../../utils/https';

const getBackgroundReq = params => Https.get('/api/app/background', params);

export {getBackgroundReq};
