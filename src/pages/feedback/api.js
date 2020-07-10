import Https from '../../utils/https';

const getFeedBackReq = params => Https.post('/api/app/feedback', params);

export {getFeedBackReq};
